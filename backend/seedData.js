const bcrypt = require('bcrypt');
const db = require('./config/database');

async function seedData() {
  console.log('🌱 Seeding database with sample data...');

  try {
    // Create sample users
    const users = [
      {
        username: 'store1',
        password: 'password123',
        role: 'store_manager',
        store_name: 'Downtown Restaurant',
        email: 'manager@downtown.com',
        phone: '555-0101'
      },
      {
        username: 'store2',
        password: 'password123',
        role: 'store_manager',
        store_name: 'Westside Diner',
        email: 'manager@westside.com',
        phone: '555-0102'
      },
      {
        username: 'maintenance1',
        password: 'password123',
        role: 'maintenance_provider',
        store_name: 'City Maintenance Services',
        email: 'tech@citymaintenance.com',
        phone: '555-0201'
      },
      {
        username: 'admin',
        password: 'password123',
        role: 'admin',
        store_name: 'Corporate Office',
        email: 'admin@restaurant-chain.com',
        phone: '555-0301'
      }
    ];

    // Insert users
    for (const user of users) {
      const password_hash = await bcrypt.hash(user.password, 10);
      
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO users (username, password_hash, role, store_name, email, phone) VALUES (?, ?, ?, ?, ?, ?)',
          [user.username, password_hash, user.role, user.store_name, user.email, user.phone],
          function(err) {
            if (err) {
              console.log(`User ${user.username} already exists or error:`, err.message);
            } else {
              console.log(`✅ Created user: ${user.username} (${user.role})`);
            }
            resolve();
          }
        );
      });
    }

    // Create sample work orders
    const workOrders = [
      {
        store_name: 'Downtown Restaurant',
        store_address: '123 Main St, Downtown',
        location_details: 'Kitchen area near the walk-in freezer',
        category: 'HVAC',
        priority: 'critical',
        title: 'Walk-in freezer not cooling properly',
        description: 'The walk-in freezer temperature has risen to 45°F. Food safety concern. Needs immediate attention.',
        status: 'pending',
        submitted_by: 1
      },
      {
        store_name: 'Downtown Restaurant',
        store_address: '123 Main St, Downtown',
        location_details: 'Front dining area',
        category: 'Lighting',
        priority: 'medium',
        title: 'Several ceiling lights out',
        description: 'Three overhead lights in the dining area are not working. Need bulbs replaced.',
        status: 'assigned',
        submitted_by: 1,
        assigned_to: 3
      },
      {
        store_name: 'Westside Diner',
        store_address: '456 Oak Ave, Westside',
        location_details: 'Customer restroom',
        category: 'Plumbing',
        priority: 'high',
        title: 'Toilet running continuously',
        description: 'The toilet in the women\'s restroom is running constantly. Water waste and noise issue.',
        status: 'in_progress',
        submitted_by: 2,
        assigned_to: 3
      },
      {
        store_name: 'Westside Diner',
        store_address: '456 Oak Ave, Westside',
        location_details: 'Kitchen prep area',
        category: 'Equipment',
        priority: 'medium',
        title: 'POS terminal screen flickering',
        description: 'The main POS terminal screen is flickering intermittently. Making it difficult to process orders.',
        status: 'pending',
        submitted_by: 2
      },
      {
        store_name: 'Downtown Restaurant',
        store_address: '123 Main St, Downtown',
        location_details: 'Back entrance',
        category: 'Safety',
        priority: 'high',
        title: 'Emergency exit sign not lit',
        description: 'The exit sign above the back door is not illuminated. Safety code violation.',
        status: 'pending',
        submitted_by: 1
      },
      {
        store_name: 'Westside Diner',
        store_address: '456 Oak Ave, Westside',
        location_details: 'Exterior parking lot',
        category: 'Upkeep',
        priority: 'low',
        title: 'Parking lot striping faded',
        description: 'The parking space lines in the lot are very faded and hard to see. Needs repainting.',
        status: 'pending',
        submitted_by: 2
      },
      {
        store_name: 'Downtown Restaurant',
        store_address: '123 Main St, Downtown',
        location_details: 'Main dining area',
        category: 'Upkeep',
        priority: 'low',
        title: 'Wall needs touch-up paint',
        description: 'Scuff marks and scratches on the east wall of the dining room. Needs touch-up.',
        status: 'completed',
        submitted_by: 1,
        assigned_to: 3
      }
    ];

    // Insert work orders
    for (const wo of workOrders) {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO work_orders (
            store_name, store_address, location_details, category, priority,
            title, description, status, submitted_by, assigned_to
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            wo.store_name, wo.store_address, wo.location_details, wo.category,
            wo.priority, wo.title, wo.description, wo.status,
            wo.submitted_by, wo.assigned_to
          ],
          function(err) {
            if (err) {
              console.log('Error creating work order:', err.message);
            } else {
              console.log(`✅ Created work order: ${wo.title}`);
            }
            resolve();
          }
        );
      });
    }

    // Add some updates to work orders
    const updates = [
      { work_order_id: 2, user_id: 3, update_text: 'Technician assigned. Will arrive tomorrow morning.' },
      { work_order_id: 3, user_id: 3, update_text: 'Started work. Identified issue with flapper valve.' },
      { work_order_id: 3, user_id: 3, update_text: 'Ordered replacement parts. Will be delivered today.' },
      { work_order_id: 7, user_id: 3, update_text: 'Work completed. Applied touch-up paint to all marked areas.' },
      { work_order_id: 7, user_id: 1, update_text: 'Verified completion. Looks great! Thank you.' }
    ];

    for (const update of updates) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO work_order_updates (work_order_id, user_id, update_text) VALUES (?, ?, ?)',
          [update.work_order_id, update.user_id, update.update_text],
          (err) => {
            if (err) {
              console.log('Error creating update:', err.message);
            }
            resolve();
          }
        );
      });
    }

    console.log('✅ Database seeding completed!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('Store Manager 1: username=store1, password=password123');
    console.log('Store Manager 2: username=store2, password=password123');
    console.log('Maintenance: username=maintenance1, password=password123');
    console.log('Admin: username=admin, password=password123');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run seed if called directly
if (require.main === module) {
  seedData().then(() => {
    console.log('Seed complete. You can now close this.');
    setTimeout(() => process.exit(0), 1000);
  });
}

module.exports = seedData;

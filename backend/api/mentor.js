const express = require('express');
const router = express.Router();

// Mentorship advice library organized by topic
const adviceLibrary = {
  'starting-a-business': [
    {
      title: 'Validate Your Business Idea',
      content: 'Before investing time and money, validate your business idea by talking to potential customers, researching competitors, and testing your assumptions with a minimum viable product (MVP).',
      category: 'starting-a-business'
    },
    {
      title: 'Create a Business Plan',
      content: 'A solid business plan helps you clarify your vision, identify challenges, and attract investors. Include executive summary, market analysis, organization structure, product/service line, marketing strategy, and financial projections.',
      category: 'starting-a-business'
    },
    {
      title: 'Choose the Right Business Structure',
      content: 'Select between sole proprietorship, LLC, partnership, or corporation based on your needs for liability protection, tax benefits, and complexity. Consult with an attorney or accountant.',
      category: 'starting-a-business'
    }
  ],
  'marketing': [
    {
      title: 'Know Your Target Audience',
      content: 'Create detailed customer personas. Understand their pain points, preferences, and behaviors. Tailor your marketing messages to address their specific needs.',
      category: 'marketing'
    },
    {
      title: 'Build a Strong Online Presence',
      content: 'Establish a professional website, create social media profiles, and produce valuable content. Use SEO best practices to increase visibility.',
      category: 'marketing'
    },
    {
      title: 'Leverage Content Marketing',
      content: 'Create valuable, relevant content that attracts and engages your target audience. Blog posts, videos, podcasts, and infographics can establish you as an industry expert.',
      category: 'marketing'
    }
  ],
  'sales': [
    {
      title: 'Focus on Value, Not Features',
      content: 'Customers care about how your product/service solves their problems, not just its features. Frame your pitch around the value and outcomes you deliver.',
      category: 'sales'
    },
    {
      title: 'Follow Up Consistently',
      content: 'Many sales are made after multiple follow-ups. Create a systematic follow-up process and use CRM tools to track interactions.',
      category: 'sales'
    },
    {
      title: 'Listen More Than You Talk',
      content: 'Effective selling is about understanding customer needs. Ask questions, listen actively, and provide solutions based on what you learn.',
      category: 'sales'
    }
  ],
  'customer-service': [
    {
      title: 'Respond Quickly',
      content: 'Fast response times show customers you value their time. Aim to respond to inquiries within 24 hours, preferably sooner.',
      category: 'customer-service'
    },
    {
      title: 'Turn Complaints into Opportunities',
      content: 'Handle complaints professionally and see them as opportunities to improve. A well-handled complaint can turn a dissatisfied customer into a loyal advocate.',
      category: 'customer-service'
    },
    {
      title: 'Exceed Expectations',
      content: 'Go the extra mile to surprise and delight customers. Small gestures can create memorable experiences that lead to referrals.',
      category: 'customer-service'
    }
  ],
  'team-building': [
    {
      title: 'Hire for Culture Fit',
      content: 'Skills can be taught, but attitude and values are harder to change. Hire people who align with your company culture and values.',
      category: 'team-building'
    },
    {
      title: 'Invest in Training',
      content: 'Regular training and development show employees you value their growth. This increases retention and improves performance.',
      category: 'team-building'
    },
    {
      title: 'Communicate Vision Clearly',
      content: 'Ensure every team member understands the company vision and how their role contributes. This creates alignment and motivation.',
      category: 'team-building'
    }
  ],
  'scaling': [
    {
      title: 'Systematize Everything',
      content: 'Document processes and create systems that work without your constant involvement. This frees you to focus on strategic growth.',
      category: 'scaling'
    },
    {
      title: 'Focus on Profitable Growth',
      content: 'Growth for growth\'s sake can be dangerous. Ensure new customers, products, or markets are profitable and align with your strategy.',
      category: 'scaling'
    },
    {
      title: 'Build a Strong Team',
      content: 'You can\'t scale alone. Hire talented people, delegate effectively, and build a team that can execute your vision.',
      category: 'scaling'
    }
  ]
};

// Get all advice topics
router.get('/topics', (req, res) => {
  const topics = Object.keys(adviceLibrary);
  res.json(topics);
});

// Get advice by topic
router.get('/advice/:topic', (req, res) => {
  const topic = req.params.topic;
  const advice = adviceLibrary[topic];
  
  if (!advice) {
    res.status(404).json({ error: 'Topic not found' });
    return;
  }
  
  res.json(advice);
});

// Get all advice
router.get('/advice', (req, res) => {
  const allAdvice = [];
  for (const topic in adviceLibrary) {
    allAdvice.push(...adviceLibrary[topic]);
  }
  res.json(allAdvice);
});

// Get daily motivation
router.get('/motivation', (req, res) => {
  const motivations = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future depends on what you do today.",
    "Believe you can and you're halfway there.",
    "Your limitation—it's only your imagination.",
    "Great things never come from comfort zones.",
    "Success doesn't just find you. You have to go out and get it.",
    "Dream it. Wish it. Do it.",
    "The harder you work for something, the greater you'll feel when you achieve it."
  ];
  
  const randomIndex = Math.floor(Math.random() * motivations.length);
  res.json({ message: motivations[randomIndex] });
});

// Get decision-making framework
router.get('/decision-framework', (req, res) => {
  const framework = {
    steps: [
      {
        step: 1,
        title: 'Define the Decision',
        description: 'Clearly articulate what decision needs to be made and why it matters.'
      },
      {
        step: 2,
        title: 'Gather Information',
        description: 'Collect relevant data, research options, and consult with experts or stakeholders.'
      },
      {
        step: 3,
        title: 'Identify Alternatives',
        description: 'List all possible options and courses of action.'
      },
      {
        step: 4,
        title: 'Weigh the Evidence',
        description: 'Evaluate pros and cons of each alternative. Consider short-term and long-term impacts.'
      },
      {
        step: 5,
        title: 'Choose Among Alternatives',
        description: 'Select the option that best aligns with your goals and values.'
      },
      {
        step: 6,
        title: 'Take Action',
        description: 'Implement your decision with a clear action plan.'
      },
      {
        step: 7,
        title: 'Review Your Decision',
        description: 'After implementation, assess the results and learn from the outcome.'
      }
    ]
  };
  
  res.json(framework);
});

// Get problem-solving guide
router.get('/problem-solving', (req, res) => {
  const guide = {
    title: 'Problem-Solving Framework',
    steps: [
      {
        step: 1,
        title: 'Identify the Problem',
        description: 'Define the problem clearly. What exactly is wrong? When does it occur?',
        questions: [
          'What is the problem?',
          'Where is it happening?',
          'When does it occur?',
          'Who is affected?'
        ]
      },
      {
        step: 2,
        title: 'Analyze the Root Cause',
        description: 'Use the "5 Whys" technique to dig deeper into the underlying cause.',
        questions: [
          'Why is this happening?',
          'What factors contribute to this problem?',
          'Is this a symptom or the root cause?'
        ]
      },
      {
        step: 3,
        title: 'Generate Solutions',
        description: 'Brainstorm multiple potential solutions without judgment.',
        questions: [
          'What are all possible solutions?',
          'What has worked in similar situations?',
          'What resources do we have available?'
        ]
      },
      {
        step: 4,
        title: 'Evaluate and Select',
        description: 'Assess each solution based on feasibility, cost, and impact.',
        questions: [
          'Which solution is most feasible?',
          'What are the risks and benefits?',
          'What resources are required?'
        ]
      },
      {
        step: 5,
        title: 'Implement Solution',
        description: 'Create an action plan and execute it.',
        questions: [
          'What are the specific steps?',
          'Who is responsible for each step?',
          'What is the timeline?'
        ]
      },
      {
        step: 6,
        title: 'Monitor and Adjust',
        description: 'Track progress and make adjustments as needed.',
        questions: [
          'Is the solution working?',
          'What metrics are we tracking?',
          'What adjustments are needed?'
        ]
      }
    ]
  };
  
  res.json(guide);
});

module.exports = router;

import React, { useState, useEffect } from 'react';
import { mentorAPI } from '../utils/api';
import './MentorPage.css';

const MentorPage = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [advice, setAdvice] = useState([]);
  const [motivation, setMotivation] = useState('');

  useEffect(() => {
    loadTopics();
    loadMotivation();
  }, []);

  const loadTopics = async () => {
    try {
      const response = await mentorAPI.getTopics();
      setTopics(response.data);
    } catch (error) {
      console.error('Error loading topics:', error);
    }
  };

  const loadMotivation = async () => {
    try {
      const response = await mentorAPI.getMotivation();
      setMotivation(response.data.message);
    } catch (error) {
      console.error('Error loading motivation:', error);
    }
  };

  const loadAdvice = async (topic) => {
    try {
      const response = await mentorAPI.getAdvice(topic);
      setAdvice(response.data);
      setSelectedTopic(topic);
    } catch (error) {
      console.error('Error loading advice:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Mentorship & Advice</h2>
      </div>

      <div className="motivation-banner">
        <div className="motivation-icon">💡</div>
        <p>{motivation}</p>
      </div>

      <div className="mentor-content">
        <div className="topics-sidebar">
          <h3>Topics</h3>
          <div className="topics-list">
            {topics.map((topic) => (
              <button
                key={topic}
                className={`topic-btn ${selectedTopic === topic ? 'active' : ''}`}
                onClick={() => loadAdvice(topic)}
              >
                {topic.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="advice-content">
          {advice.length > 0 ? (
            <div className="advice-list">
              {advice.map((item, index) => (
                <div key={index} className="advice-card">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🎓</div>
              <div className="empty-state-text">Select a Topic</div>
              <div className="empty-state-subtext">
                Choose a topic from the sidebar to view mentorship advice
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorPage;

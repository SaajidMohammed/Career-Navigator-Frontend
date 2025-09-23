import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import RecommendationCard from '../../components/RecommendationCard/RecommendationCard';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ FIX: Use optional chaining (?.) to safely access predictionData.
  // This prevents a crash if location.state is null or undefined.
  const predictionData = location.state?.predictionData;

  const [recommendations, setRecommendations] = useState(predictionData ? [predictionData] : []);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
    // You could add logic here in the future to fetch all past recommendations
    // from your API if no new predictionData is passed in the navigation state.
  }, [user, navigate]);

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard, {user?.name || 'User'}!</h1>
      <div className="recommendations-list">
        {recommendations.length > 0 ? (
          recommendations.map((rec) => (
            <RecommendationCard key={rec._id} recommendation={rec} />
          ))
        ) : (
          <p>No career recommendations yet. Go to the prediction page to get started!</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

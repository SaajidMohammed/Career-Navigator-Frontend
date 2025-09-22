import axios from 'axios';

const API_URL = 'https://career-navigator-api-rptb.onrender.com/api/predictions'; 

const getPrediction = async (predictionData, token) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['authorization'] = `Bearer ${token}`;
  }
  try {
    const response = await axios.post(API_URL, predictionData, { headers });
    return response.data;
  } catch (error) {
    // Log detailed error
    if (error.response) {
      console.error('API response error:', error.response.data);
      throw new Error(error.response.data.detail || 'API responded with error');
    } else if (error.request) {
      console.error('No response from API:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Axios error:', error.message);
      throw new Error(error.message);
    }
  }
};

const predictionService = {
  getPrediction,
};

export default predictionService;

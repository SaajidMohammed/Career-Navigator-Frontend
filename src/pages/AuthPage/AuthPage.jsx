import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import './AuthPage.css';

const AuthPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { register, login } = useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({ name, email, password });
      }
      navigate('/'); // Updated line: Redirects to the home page
    } catch (error) {
      console.error('Authentication failed:', error.response?.data?.message || error.message);
      alert('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {!isLogin && (
          <input
            className="auth-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-button" onClick={handleAuth}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className="toggle-text" onClick={() => setIsLogin(prev => !prev)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Naya Smart Popup
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Purane boring 'alert()' ki jagah naya smart 'toast'
        toast.success('Login Successful! 🎉');
        
        // Thoda ruk kar redirect karenge taaki user ko popup dikh jaye
        setTimeout(() => {
          window.location.href = '/'; // Redirect + reload
        }, 1500); 
      } else {
        toast.error(data.message || 'Login Failed!');
      }
    } catch (error) {
      toast.error('Backend Server is not running!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p>New here? <Link to="/register">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;

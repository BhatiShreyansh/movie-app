import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { API_BASE_URL } from '../config';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Login Successful! 🎉');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500); 
      } else {
        toast.error(data.message || 'Login Failed!');
      }
    } catch (error) {
      toast.error('Backend Server is not running!');
    }
  };

  // 🔥 One-Click Google Login via Firebase
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      // Backend ko send karo taaki JWT token mil sake
      const response = await fetch(`${API_BASE_URL}/api/auth/google-firebase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: googleUser.displayName,
          email: googleUser.email,
          avatar: googleUser.photoURL
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success(data.message || 'Google Login Successful! 🎉');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        toast.error(data.message || 'Backend Google Login Failed!');
      }
    } catch (error) {
      console.error("Firebase Login Error:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info('Google sign-in cancelled');
      } else if (error.code === 'auth/configuration-not-found' || error.code === 'auth/invalid-api-key') {
        toast.error('Please configure your Firebase keys in firebase.js!');
      } else {
        toast.error(error.message || 'Google Login Error!');
      }
    } finally {
      setLoading(false);
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

        {/* Divider */}
        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* Firebase Google Button */}
        <button 
          type="button" 
          className="google-auth-btn" 
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" />
          <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
        </button>

        <p>New here? <Link to="/register">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;

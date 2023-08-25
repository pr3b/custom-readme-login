"use client"

import { useState } from 'react';
import Head from 'next/head';
import RootLayout from '../layout';

export default function Login() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/readme-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      console.log(response, 'response')

      

      // Redirect logic or handle successful login response

    } catch (error) {
      console.error('Error:', error);
      // Handle login error
    }
  };

  return (
    <RootLayout>
      <div className="login-container">
        <div className="login-header">
          <h1>Demo Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form-control"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </RootLayout>
  );
}

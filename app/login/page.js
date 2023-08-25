"use client"

import { useState } from 'react';
import Head from 'next/head';
import RootLayout from '../layout';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(email, password)

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submit button clicked'); // Add this line

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch(`/api/readme-login`,{
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.text();
      // console.log(data, "data yg kluar"); // Access the URL data from the response/
      router.push(data)

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

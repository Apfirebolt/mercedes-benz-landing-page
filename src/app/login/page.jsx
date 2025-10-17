"use client";

import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';

// =================================================================
// MOCKED DEPENDENCIES
// The actual 'signIn' utility and 'useRouter' cannot be imported 
// in this environment, so we keep the mocks for flow control.
// =================================================================

// Mocked router to simulate navigation
const mockRouter = {
  push: (path) => console.log(`[Router Mock] Simulated Navigation to: ${path}`),
};

// Mocked session status for demonstration purposes
const MOCK_SESSION_STATE = {
    UNAUTHENTICATED: 'unauthenticated',
    AUTHENTICATED: 'authenticated'
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionStatus, setSessionStatus] = useState(MOCK_SESSION_STATE.UNAUTHENTICATED);

  // In a real app, this useEffect would watch useSession().status and trigger a redirect.
  useEffect(() => {
    if (sessionStatus === MOCK_SESSION_STATE.AUTHENTICATED) {
        // Successful mock login
        mockRouter.push('/'); 
    }
  }, [sessionStatus]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    // Crucial: The callbackUrl is where NextAuth redirects on success (if redirect: true).
    formData.append('callbackUrl', '/'); 
    
    let result;
    
    try {
        result = await signIn('credentials', {
            redirect: false, // We handle redirection manually in this mock
            email,
            password,
        });
        
    } catch (apiError) {
        console.error("Network or API call failed:", apiError);
        // Handle network issues or unhandled exceptions
        result = { ok: false, error: 'Network error: Could not reach NextAuth endpoint.' };
    }

    setLoading(false);

    if (result && result.error) {
      // 2. Display the error message received from the NextAuth route
      setError(result.error);
      setSessionStatus(MOCK_SESSION_STATE.UNAUTHENTICATED);
    } else if (result && result.ok) {
      // 3. Login successful, session cookie is now set by NextAuth
      setError('Login successful! Check the console for simulated redirection to /. The Express API was hit.');
      setSessionStatus(MOCK_SESSION_STATE.AUTHENTICATED);
    } else {
        // Catch any unexpected response formats
        setError('An unexpected response was received during authentication.');
        setSessionStatus(MOCK_SESSION_STATE.UNAUTHENTICATED);
    }
  };

  // If successfully authenticated in the mock, show a redirection message
  if (sessionStatus === MOCK_SESSION_STATE.AUTHENTICATED && !loading) {
     return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-xl font-medium text-green-600">
                Login successful. Simulated redirection is logged to the console.
            </div>
        </div>
     );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Sign In
        </h1>
        <p className="text-center text-sm text-gray-600">
          This form now hits your `/api/auth/callback/credentials` route.
        </p>
        
        {error && (
          <div className="p-3 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 transition duration-150"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 transition duration-150"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-150 disabled:bg-violet-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
// Use signIn('google') or signIn('github') to trigger Google/GitHub sign-in

export default function Login() {
  // Mock session state for demonstration purposesconst { data: session, status } = useSession();
  const { data: session, status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailTrim = email.trim();
    const passwordVal = password;

    if (!emailTrim || !passwordVal) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false, // keep manual redirect handling in this mock
        email: emailTrim,
        password: passwordVal,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        // Successful mock login
        setError('Login successful! Check the console for simulated redirection to /. The Express API was hit.');
      } else {
        setError('An unexpected response was received during authentication.');
      }
    } catch (err) {
      console.error('Network or API call failed:', err);
      setError('Network error: Could not reach NextAuth endpoint.');
    } finally {
      setLoading(false);
    }
  };

  // Google sign in handler
  const handleGoogleSignIn = () => {
    signIn('google');
  };

  // GitHub sign in handler
  const handleGitHubSignIn = () => {
    signIn('github');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center p-4 bg-secondary font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Login
        </h1>
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

        <div>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-sm text-gray-500">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              aria-label="Sign in with Google"
              className="inline-flex items-center justify-center py-2 px-4 border rounded-lg shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 disabled:opacity-50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.4 1.2 8.4 2.8l6.2-6.2C34.1 3 29.4 1 24 1 14.7 1 6.9 6.4 3.1 14.5l7.2 5.6C11.9 13.1 17.5 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.5 24.5c0-1.6-.2-3.1-.6-4.6H24v9.1h12.6c-.5 3-2.5 5.6-5.3 7.2l8 6.2C43.8 39.3 46.5 32.6 46.5 24.5z"/>
                <path fill="#FBBC05" d="M10.3 29.9c-.8-2.3-1.3-4.7-1.3-7.4 0-2.6.5-5 .3-7.3L3.1 9.6C1.1 13.6 0 18.7 0 24.5s1.1 10.9 3.1 14.9l7.2-5.6z"/>
                <path fill="#4285F4" d="M24 46c6.1 0 11.2-2 15-5.4l-8-6.2c-2.2 1.5-5 2.4-7 2.4-6.6 0-12.1-4.4-14.1-10.6L3.1 38.4C6.9 44.6 14 46 24 46z"/>
              </svg>
              Google Sign In
            </button>

            <button
              type="button"
              onClick={handleGitHubSignIn}
              disabled={loading}
              aria-label="Sign in with GitHub"
              className="inline-flex items-center justify-center py-2 px-4 border rounded-lg shadow-sm bg-gray-800 hover:bg-gray-900 text-sm font-medium text-white disabled:opacity-50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.38-3.88-1.38-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.26 3.4.96.11-.75.41-1.26.75-1.55-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.44-2.69 5.41-5.25 5.69.42.36.8 1.07.8 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
              </svg>
              GitHub
            </button>
          </div>
        </div>

        {session?.user && (
          <div className="pt-4 mt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Signed in as <span className="font-medium">{session.user.email || session.user.name}</span>
              </div>
              <button
                type="button"
                onClick={() => signOut()}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
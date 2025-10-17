"use client";

import { useSession, signOut } from 'next-auth/react'; // MOCKED IMPORTS

export default function AuthStatus() {
  // The useSession hook gives you the current status
  const { data: session, status } = useSession();

  const loading = status === 'loading';

  if (loading) {
    return <div className="text-gray-500">Loading session...</div>;
  }

  if (session) {
    // User is logged in
    return (
      <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg shadow-sm">
        <p className="text-lg font-semibold text-green-800">
          Logged in as: {session.user.email || 'User'}
        </p>
        <p className="text-sm text-gray-500">
          (User ID: {session.user.id})
        </p>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      </div>
    );
  }

  // User is not logged in
  return (
    <div className="p-4 bg-yellow-50 rounded-lg shadow-sm">
      <p className="text-lg font-medium text-yellow-800">
        You are currently **Signed Out**.
      </p>
      {/* Link to your /login page */}
    </div>
  );
}
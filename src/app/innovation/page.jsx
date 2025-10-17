"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";

export default function Innovation() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) {
    return <div className="text-gray-500">Loading session...</div>;
  }

  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 font-sans">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-xl">
          <h1 className="text-3xl font-extrabold text-center text-gray-900">
            Innovation
          </h1>
          <p className="text-center text-sm text-gray-600">
            This is the innovation page.
          </p>

          <p className="text-lg font-semibold text-green-800">
            Logged in as: {session.user.email || "User"}
          </p>
          <p className="text-sm text-gray-500">(User ID: {session.user.id})</p>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }
}

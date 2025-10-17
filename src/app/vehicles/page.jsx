"use client";

import React from 'react';

export default function Vehicle() {

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Vehicle
        </h1>
        <p className="text-center text-sm text-gray-600">
          This is the vehicle page.
        </p>
      </div>
    </div>
  );
}
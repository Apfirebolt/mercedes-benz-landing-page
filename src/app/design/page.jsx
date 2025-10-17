"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from 'next-auth/react';
import axios from "axios";

export default function Design() {
  const { data: session, status } = useSession();

  const fetchBackendData = async () => {
    if (status !== 'authenticated') {
      console.error("User not authenticated.");
      return;
    }

    try {
      // 1. Call the local Next.js API route to get the raw JWT
      const tokenResponse = await axios.get('/api/raw-jwt');
      const jwt = tokenResponse?.data?.jwt;
      if (!jwt) {
        console.error("Authentication failed or token retrieval error.");
        return;
      }

      // 2. Send the raw JWT to your separate backend for verification
      const backendResponse = await axios.get('http://localhost:5000/api/logs', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
      });

      console.log("Data from Separate Backend:", backendResponse.data);
      return backendResponse.data;
    } catch (error) {
      console.error("Error fetching backend data:", error);
    }
  };

  const paragraphs = [
    "This is the first animated paragraph.",
    "Here comes the second paragraph, animating after the first.",
    "Finally, this is the third paragraph.",
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  useEffect(() => {
    fetchBackendData();
  }, [status]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Design
        </h1>

        <motion.div
          className="text-center text-sm text-gray-600 space-y-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {paragraphs.map((text, i) => (
            <motion.p key={i} variants={item}>
              {text}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
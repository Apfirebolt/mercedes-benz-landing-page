"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Design() {
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

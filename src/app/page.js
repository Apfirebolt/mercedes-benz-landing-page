"use client";

import Image from "next/image";
import React, { Fragment } from "react";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Social from "@/components/social";

const Home = () => {
  return (
    <Fragment>
      <main className="min-h-screen flex flex-col">
        <section className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white">
          <motion.div
            className="bg-black bg-opacity-50 p-6 rounded-lg text-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-bold mb-4">
              Welcome to Mercedes-Benz
            </h1>
            <p className="text-lg mb-4">
              Discover the legacy of innovation, craftsmanship, and performance
              from Mercedes-Benz.
            </p>
            <p className="text-lg mb-4">
              Explore our latest model lineup, from luxury sedans and SUVs to
              the cutting-edge electric EQ series.
            </p>
            <p className="text-lg mb-4">
              Learn about advanced safety systems, intelligent connectivity, and
              bespoke options that elevate your driving experience.
            </p>
            <p className="text-lg">
              Whether you're seeking refined luxury, exhilarating performance,
              or sustainable mobility, Mercedes-Benz delivers excellence.
            </p>
            <button className="px-6 my-3 py-3 bg-accent text-secondary hover:bg-blue-600 font-semibold rounded">
              Explore Mercedes-Benz
            </button>
          </motion.div>
        </section>
        <Social />
      </main>
    </Fragment>
  );
};

export default Home;

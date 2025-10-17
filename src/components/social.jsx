import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Social = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white text-black py-8 px-4">
            <h1 className='text-4xl text-center font-bold mt-4 mb-8'>
                Follow Mercedes-Benz on Social Media
            </h1>
            <div className="flex space-x-12 justify-center mt-6 mb-4">
                <a href="https://www.facebook.com/mercedesbenz" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebookF className="text-3xl" />
                </a>
                <a href="https://twitter.com/mercedesbenz" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FaTwitter className="text-3xl" />
                </a>
                <a href="https://www.instagram.com/mercedesbenz" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram className="text-3xl" />
                </a>
                <a href="https://www.youtube.com/mercedesbenz" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <FaYoutube className="text-3xl" />
                </a>
                <a href="https://www.linkedin.com/company/mercedes-benz" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin className="text-3xl" />
                </a>
            </div>
        </motion.section>
    );
};

export default Social;
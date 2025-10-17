import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primary text-accent py-8 px-4">
            <div className="container mx-auto text-center mb-6 border-4 border-accent rounded-lg py-4 shadow-lg">
                <p className="text-2xl font-bold">&copy; {new Date().getFullYear()} Next Animix. All rights reserved.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                <div className="bg-secondary p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Character Info</h3>
                    <p className="text-sm">
                        Explore detailed information about your favorite characters, their backstories, and unique traits.
                    </p>
                </div>

                <div className="bg-secondary p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Manga Info</h3>
                    <p className="text-sm">
                        Discover the latest manga releases, summaries, and recommendations tailored for you.
                    </p>
                </div>

                <div className="bg-secondary p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Anime Info</h3>
                    <p className="text-sm">
                        Stay updated with trending anime, episode guides, and exclusive reviews.
                    </p>
                </div>
            </div>
            <div className="mt-8 border-t border-accent pt-4">
                <ul className="flex flex-wrap justify-center gap-4 text-sm">
                    <li><a href="#" className="hover:underline">Provider</a></li>
                    <li><a href="#" className="hover:underline">Legal Notice</a></li>
                    <li><a href="#" className="hover:underline">Settings</a></li>
                    <li><a href="#" className="hover:underline">Privacy</a></li>
                    <li><a href="#" className="hover:underline">Contact</a></li>
                    <li><a href="#" className="hover:underline">Third Party License Notices</a></li>
                    <li><a href="#" className="hover:underline">Don't Sell My Personal Information (CCPA)</a></li>
                </ul>
                <div className="flex justify-center mt-4">
                    <img 
                        src="https://i.pinimg.com/736x/3a/2a/c4/3a2ac47e1f4f22ba320e72110af25d30.jpg" 
                        alt="Mercedes-Benz Logo" 
                        className="h-16 w-auto"
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
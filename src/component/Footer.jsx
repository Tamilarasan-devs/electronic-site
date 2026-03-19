import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 md:flex md:justify-between md:items-start">
        {/* Logo & Description */}
        <div className="mb-8 md:mb-0">
          <h1 className="text-2xl font-bold text-white mb-2">TVBrands</h1>
          <p className="text-gray-400 max-w-xs">
            Explore top TV brands with ease. Discover, compare, and find the perfect TV for your home.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-8 md:mb-0">
          <h2 className="font-semibold text-white mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2 hover:text-white transition-colors cursor-pointer">Home</li>
            <li className="mb-2 hover:text-white transition-colors cursor-pointer">Brands</li>
            <li className="mb-2 hover:text-white transition-colors cursor-pointer">Reviews</li>
            <li className="mb-2 hover:text-white transition-colors cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © 2026 fruition global. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
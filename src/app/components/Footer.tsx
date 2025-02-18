

import Link from "next/link";
import { FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-gray-300">Meeting Room Booking</h2>
          <p className="text-sm text-gray-400 mt-1">Book your space with ease.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 my-4 md:my-0">
          <Link href="/" className="hover:text-gray-300 transition">About</Link>
          <Link href="/" className="hover:text-gray-300 transition">Contact</Link>
          <Link href="/" className="hover:text-gray-300 transition">FAQ</Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition text-2xl">
            <FaFacebook />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition text-2xl">
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 text-center text-gray-400 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Meeting Room Booking. All Rights Reserved.
      </div>
    </footer>
  );
}

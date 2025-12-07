import React from "react";
import { FaHeartbeat, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Added icons for contact

export default function Footer() {
  const navLinks = [
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
    { title: "Contact Support", href: "#" },
    { title: "Our Mission", href: "#" },
  ];

  const year = new Date().getFullYear();

  return (
    // Footer uses a deep navy blue/slate background with subtle dark gradient
    <footer className="bg-slate-900 text-white pt-16 pb-8 mt-16 font-sans shadow-inner shadow-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Area: Branding and Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 border-b border-slate-700 pb-10 mb-8">
          {/* Column 1: Company Info/Branding */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center mb-4">
              <FaHeartbeat className="w-8 h-8 text-cyan-400 mr-3" />
              <h3 className="text-3xl font-extrabold tracking-wider">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                  MedVault
                </span>
              </h3>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              The secure, digital gateway built for **HIPAA compliant** and
              seamless healthcare management globally.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-300">Platform</h4>
            <ul className="space-y-3">
              {navLinks.slice(0, 2).map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition duration-200"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-lg font-bold mb-4 text-blue-300">Connect</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-cyan-400" /> support@medibook.com
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-cyan-400" /> 123 Digital Health
                Way
              </li>
              <li>+1 (800) 555-BOOK</li>
            </ul>
          </div>

          {/* Column 4: Professional Access */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-300">Access</h4>
            <a
              href="/admin/login"
              className="inline-block px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition duration-300 text-sm"
              aria-label="Admin Login"
            >
              Professional Login
            </a>
            <p className="text-xs text-slate-500 mt-2">Doctor/Admin Portal</p>
          </div>
        </div>

        {/* Copyright and Bottom Text */}
        <div className="text-center pt-6">
          <p className="text-sm text-slate-400">
            &copy; {year} MedVault. All Rights Reserved.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Built for modern health. Ensuring security and privacy always.
          </p>
        </div>
      </div>
    </footer>
  );
}

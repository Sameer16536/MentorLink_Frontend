"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import Link from "next/link";

const Navbar = ({
  logo = "MentorLink",
  navItems = [
    { label: "Home", href: "/" },
    { label: "Get Referrals", href: "/referrals" },
    { label: "Mentors", href: "/mentors" },
    { label: "For Experts", href: "/experts" },
  ],
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event?.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-800/30"
          : "bg-gray-900/90 backdrop-blur-lg"
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 via-red-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 group-hover:shadow-red-500/25">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-white font-semibold text-xl tracking-tight group-hover:text-red-400 transition-colors duration-300">
                {logo}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="relative text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group overflow-hidden"
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-lg"></div>
                  <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-lg delay-75"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 group border border-white/10 hover:border-white/20"
              >
                <User className="h-4 w-4" />
                <span className="text-sm">Sign Up</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full right-0 mt-2 w-48 transition-all duration-300 origin-top-right ${
                  showDropdown
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 py-2 overflow-hidden">
                  <div className="px-4 py-2 border-b border-gray-700/50">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      For Seekers
                    </p>
                  </div>
                  <a
                    href="/login?role=MENTEE"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Login
                  </a>
                  <a
                    href="/signup?role=MENTEE"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Sign up
                  </a>

                  <div className="px-4 py-2 border-b border-t border-gray-700/50 mt-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      For Experts
                    </p>
                  </div>
                  <a
                    href="/expert-login"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Login
                  </a>
                  <a
                    href="/expert-signup"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Sign up
                  </a>
                  <a
                    href="/pricing"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Pricing
                  </a>
                  <a
                    href="/start"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Start your page
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-300 group"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen
                      ? "opacity-0 rotate-45 scale-75"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-45 scale-75"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-4 pb-6 space-y-2 bg-gray-800/30 backdrop-blur-sm rounded-xl mt-4 border border-gray-700/30">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-white block px-4 py-3 rounded-lg text-base font-medium hover:bg-white/10 transition-all duration-300 transform hover:translate-x-1"
              >
                {item.label}
              </a>
            ))}

            <div className="border-t border-gray-700/50 mt-4 pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                Account
              </p>
              <a
                href="/login?role=MENTOR"
                className="text-gray-300 hover:text-white block px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-all duration-300"
              >
                Login
              </a>
              <a
                href="/signup?role=MENTOR"
                className="text-gray-300 hover:text-white block px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-all duration-300"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

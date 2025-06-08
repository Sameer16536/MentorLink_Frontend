"use client";
import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, Github, Chrome } from "lucide-react";
import InputField from "@/components/InputField";
import SocialButton from "@/components/SocialButton";
import { apiUtility } from "@/utils/Api";
import { useRouter, useSearchParams } from "next/navigation";


const LoginPage = () => {
  const [currentPage, setCurrentPage] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: role 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    //Register the user
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData?.role || "MENTEE",
    };
    try {
      await apiUtility.registerUser(payload);
      console.log("user registered successfully");
      router.push("/")
    } catch (error) {
      console.error("Error during form submission:", error);
    }
    console.log("Form submitted:", formData);
  };

  const RoleSelector = () => (
    <div className="grid grid-cols-2 gap-4">
      {[
        {
          key: "MENTEE",
          label: "I'm seeking guidance",
          desc: "Looking for mentorship",
        },
        { key: "MENTOR", label: "I'm an expert", desc: "Ready to help others" },
      ].map((role) => (
        <button
          key={role.key}
          type="button"
          onClick={() => setFormData({ ...formData, role: role.key })}
          className={`p-4 rounded-xl border-2 transition-all duration-300 group text-left ${
            formData.role === role.key
              ? "border-red-500/50 bg-red-500/10 text-white"
              : "border-gray-700/50 hover:border-gray-600/50 text-gray-400 hover:text-white"
          }`}
        >
          <div className="font-medium text-sm">{role.label}</div>
          <div className="text-xs opacity-75 mt-1">{role.desc}</div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-red-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-white font-semibold text-2xl tracking-tight">
              MentorLink
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {currentPage === "login" ? "Welcome back" : "Join MentorLink"}
          </h1>
          <p className="text-gray-400">
            {currentPage === "login"
              ? "Sign in to your account to continue"
              : "Create your account and start connecting"}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Role Selection (Signup only) */}
            {currentPage === "signup" && (
              <div className="space-y-3">
                <RoleSelector />
              </div>
            )}

            {/* Name Field (Signup only) */}
            {currentPage === "signup" && (
              <InputField
                icon={User}
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleInputChange}
              />
            )}

            {/* Email Field */}
            <InputField
              icon={Mail}
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
            />

            {/* Password Field */}
            <InputField
              icon={Lock}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              showToggle
              onToggle={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            {/* Confirm Password (Signup only) */}
            {currentPage === "signup" && (
              <InputField
                icon={Lock}
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                showToggle
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                showPassword={showConfirmPassword}
              />
            )}

            {/* Forgot Password (Login only) */}
            {currentPage === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-red-400 hover:text-red-300 transition-colors duration-300"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25 group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>
                  {currentPage === "login" ? "Sign In" : "Create Account"}
                </span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50"></div>
              </div>
              <div className="relative bg-gray-900 px-4">
                <span className="text-sm text-gray-400">or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <SocialButton
                icon={Chrome}
                provider="Google"
                className="text-gray-300 hover:text-white hover:bg-white/5"
              />
              <SocialButton
                icon={Github}
                provider="GitHub"
                className="text-gray-300 hover:text-white hover:bg-white/5"
              />
            </div>

            {/* Terms (Signup only) */}
            {currentPage === "signup" && (
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By creating an account, you agree to our{" "}
                <a
                  href="#"
                  className="text-red-400 hover:text-red-300 transition-colors duration-300"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-red-400 hover:text-red-300 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Switch Form */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            {currentPage === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() =>
                setCurrentPage(currentPage === "login" ? "signup" : "login")
              }
              className="text-red-400 hover:text-red-300 font-medium transition-colors duration-300"
            >
              {currentPage === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

"use client";
import React, { useState } from "react";
import { Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";
import InputField from "@/components/InputField";
import SocialButton from "@/components/SocialButton";
import { useSearchParams, useRouter } from "next/navigation";
import { apiUtility } from "@/utils/Api";
import { loginSuccess } from "@/redux/userSlice";
import { useAppDispatch } from "@/redux/hooks";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: role || "MENTEE",
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
    const payload = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };
    try {
      //login user
      const response = await apiUtility.loginUser(payload);
      if (!response.token) {
        throw new Error("Sign-in failed!");
      }
      console.log("Login successful:", response);
      dispatch(
        loginSuccess({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role,
          token: response.token,
        })
      );
      console.log("Login action dispatched:", loginSuccess);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

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
            <div
              className="w-10 h-10 bg-gradient-to-br from-red-500 via-red-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              onClick={() => router.push("/")}
            >
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-white font-semibold text-2xl tracking-tight">
              MentorLink
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        {/* Auth Form */}
        <div className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-8 shadow-2xl">
          <div className="space-y-6">
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

            <div className="text-right">
              <button
                type="button"
                className="text-sm text-red-400 hover:text-red-300 transition-colors duration-300"
                onClick={() => router.push(`/forgot-password`)}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25 group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Sign In</span>
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
          </div>
        </div>

        {/* Switch Form */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push(`/signup?role=${formData.role}`)}
              className="text-red-400 hover:text-red-300 font-medium transition-colors duration-300"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

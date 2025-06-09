"use client";
import React, { useState, useEffect } from "react";
import { Lock, ArrowRight } from "lucide-react";
import InputField from "@/components/InputField";
import { useRouter, useSearchParams } from "next/navigation";
import { apiUtility } from "@/utils/Api";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email || !otp) {
      router.push("/forgot-password");
    }
  }, [email, otp, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await apiUtility.resetPassword({
        email: email!,
        otp: otp!,
        password: formData.password,
      });
      router.push("/login");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
        console.error("Reset password error:", err);
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
              className="w-10 h-10 bg-gradient-to-br from-red-500 via-red-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              onClick={() => router.push("/")}
            >
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-white font-semibold text-2xl tracking-tight">
              MentorLink
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Reset Password
          </h1>
          <p className="text-gray-400">
            Enter your new password
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-8 shadow-2xl">
          <div className="space-y-6">
            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            {/* New Password Field */}
            <InputField
              icon={Lock}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="New password"
              value={formData.password}
              onChange={handleInputChange}
              showToggle
              onToggle={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            {/* Confirm Password Field */}
            <InputField
              icon={Lock}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              showToggle
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              showPassword={showConfirmPassword}
            />

            {/* Submit Button */}
            <button
              onClick={handleResetPassword}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25 group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Reset Password</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Remember your password?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-red-400 hover:text-red-300 font-medium transition-colors duration-300"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

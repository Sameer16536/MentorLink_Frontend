"use client";
import React, { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import InputField from "@/components/InputField";
import { useRouter } from "next/navigation";
import { apiUtility } from "@/utils/Api";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await apiUtility.sendResetOtp({ email });
      setIsOtpSent(true);
      setSuccess("OTP sent successfully to your email!");
      setError("");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      console.error("Send OTP error:", err);
    }
  };

  const handleVerifyOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await apiUtility.verifyResetOtp({ email, otp });
      router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${otp}`);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
      console.error("Verify OTP error:", err);
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
            Forgot Password
          </h1>
          <p className="text-gray-400">
            {!isOtpSent 
              ? "Enter your email to receive a reset OTP"
              : "Enter the OTP sent to your email"
            }
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-8 shadow-2xl">
          <div className="space-y-6">
            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}
            {success && (
              <div className="text-green-400 text-sm text-center">{success}</div>
            )}

            {/* Email Field */}
            <InputField
              icon={Mail}
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isOtpSent}
            />

            {/* OTP Field */}
            {isOtpSent && (
              <InputField
                icon={Mail}
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            )}

            {/* Submit Button */}
            <button
              onClick={isOtpSent ? handleVerifyOtp : handleSendOtp}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25 group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>{isOtpSent ? "Verify OTP" : "Send OTP"}</span>
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

export default ForgotPasswordPage;

"use client";

import { InputFieldProps } from "@/utils/types";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  icon: Icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  showToggle,
  onToggle,
  showPassword,
}: InputFieldProps) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-red-400 transition-colors duration-300" />
    </div>
    <input
      type={showToggle ? (showPassword ? "text" : "password") : type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-12 pr-12 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
    />
    {showToggle && (
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
    )}
  </div>
);

export default InputField;

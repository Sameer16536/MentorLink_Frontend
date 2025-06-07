import { SocialButtonProps } from "@/utils/types";

const SocialButton = ({
  icon: Icon,
  provider,
  className,
}: SocialButtonProps) => (
  <button
    className={`flex items-center justify-center space-x-3 w-full py-3 px-4 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group ${className}`}
  >
    <Icon className="h-5 w-5" />
    <span className="font-medium">Continue with {provider}</span>
  </button>
);

export default SocialButton;
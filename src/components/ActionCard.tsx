type ActionCardProps = {
  title: string;
  icon: React.ReactNode;
  className: string;
};


const ActionCard: React.FC<ActionCardProps> = ({ title, icon, className }) => (
  <button
    className={`${className} p-4 rounded-xl text-white font-medium text-sm hover:scale-105 hover:shadow-lg transition-all duration-300 group`}
  >
    <span className="flex items-center justify-between">
      {title}
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        {icon}
      </span>
    </span>
  </button>
);
export default ActionCard;

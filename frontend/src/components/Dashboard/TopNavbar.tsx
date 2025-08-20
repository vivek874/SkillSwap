type TopNavbarProps = {
  onLogout: () => void;
};

const TopNavbar: React.FC<TopNavbarProps> = ({ onLogout }) => {
  return (
    <nav className="bg-white shadow flex items-center justify-between px-8 py-4">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text  text-transparent tracking-tight">
            SkillSwap
          </span>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="bg-gray-400 text-white px-5 py-2 rounded-full font-semibold shadow hover:opacity-90 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default TopNavbar;

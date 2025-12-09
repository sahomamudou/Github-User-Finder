const UserStat = ({ label, number, theme = "dark" }) => {
  return (
    <div className="text-center md:text-left">
      <span className="block text-sm font-medium text-gray-400 dark:text-gray-600">
        {label}
      </span>

      <span
        className={`block text-2xl font-semibold ${
          theme === "dark" ? "text-white" : "text-dark-primary-900"
        }`}
      >
        {number}
      </span>
    </div>
  );
};

export default UserStat;

function UserMeta({
  icon,
  text,
  link = null,
  className = "space-x-4",
  theme = "dark",
}) {
  const baseTextColor =
    theme === "dark" ? "text-light-secondary" : "text-dark-primary-900";
  const linkHoverColor =
    theme === "dark" ? "hover:text-primary-400" : "hover:text-primary-600";

  return (
    <div
      className={`flex items-center ${className} ${!text ? "opacity-50" : ""}`}
    >
      <span className="flex-shrink-0">{icon}</span>

      <span className={`break-words ${baseTextColor}`}>
        {link ? (
          <a
            href={link}
            className={`hover:underline ${linkHoverColor} transition break-words`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        ) : text ? (
          text
        ) : (
          "Not Available"
        )}
      </span>
    </div>
  );
}

export default UserMeta;

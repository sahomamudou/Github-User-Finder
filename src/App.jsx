import Logo from "./components/Logo";
import UserStat from "./components/UserStat";
import UserMeta from "./components/UserMeta";
import IconLocation from "./components/icons/IconLocation";
import IconTwitter from "./components/icons/IconTwitter";
import IconWebsite from "./components/icons/IconWebsite";
import IconCompany from "./components/icons/IconCompany";
import IconSun from "./components/icons/IconSun";
import IconSearch from "./components/icons/IconSearch";
import octocat from "./assets/octocat.svg";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("octocat");
  const [theme, setTheme] = useState("dark");

  // Detect system theme
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // Apply theme to html root
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Fetch GitHub user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        setUser({});
      }
    };
    fetchUser();
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.username.value.trim();
    if (input) setUsername(input);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-dark-primary-800 text-light-secondary"
          : "bg-gray-50 text-dark-primary-900"
      }`}
    >
      <div className="w-full max-w-screen-md 2xl:max-w-[840px] mx-auto py-4 px-4 sm:px-8">
        {/* TOP BAR */}
        <div className="flex justify-between items-center">
          <h1>
            <Logo dark={theme === "dark"} />
          </h1>

          <button
            className="inline-flex space-x-4 items-center hover:opacity-80 transition"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            type="button"
          >
            <span className="font-semibold uppercase text-sm tracking-wider">
              {theme === "dark" ? "Light" : "Dark"}
            </span>
            <IconSun />
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="w-full mt-6 sm:mt-10">
          <form onSubmit={handleSubmit} className="relative w-full">
            {/* Search Icon */}
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500" />

            {/* Input */}
            <input
              type="text"
              name="username"
              className={`
        w-full border-0 rounded-xl py-3 pl-10 pr-20 text-sm sm:text-lg placeholder:text-gray-400
        ${
          theme === "dark"
            ? "bg-dark-primary-600 text-light-secondary placeholder:text-gray-500"
            : "bg-white text-dark-primary-900 placeholder:text-gray-400"
        }
      `}
              placeholder="Search GitHub username..."
              defaultValue={username}
            />

            {/* Button inside input */}
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* USER CARD */}
        <div
          className={`
            rounded-xl mt-8 py-[3.25rem] px-4 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-y-4 gap-x-10 transition-colors
            ${theme === "dark" ? "bg-dark-primary-600" : "bg-white shadow-md"}
          `}
        >
          {/* AVATAR */}
          <div className="col-span-1 flex justify-center md:block md:relative">
            <img
              src={user.avatar_url || octocat}
              alt={user.login || "octocat"}
              className="w-24 h-24 rounded-full md:absolute md:-top-[0.55rem] md:w-full"
            />
          </div>

          {/* NAME + DATE */}
          <div className="col-span-3 flex flex-col md:flex-row items-center justify-between mt-6 md:mt-0">
            <div>
              <h2
                className={`${
                  theme === "dark"
                    ? "text-light-secondary"
                    : "text-dark-primary-900"
                } text-[1.65rem] font-semibold leading-5`}
              >
                {user.name || "The Octocat"}
              </h2>
              <span className="text-primary-500 inline-block mt-2.5">
                @{user.login || "octocat"}
              </span>
            </div>

            <div>
              <p
                className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
              >
                Joined{" "}
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "25 Jan 2011"}
              </p>
            </div>
          </div>

          {/* BIO */}
          <div className="col-span-3 col-start-1 md:col-start-2 mt-6 md:mt-0 text-center md:text-left">
            <p
              className={
                theme === "dark" ? "text-light-secondary" : "text-gray-800"
              }
            >
              {user.bio || "This profile has no bio"}
            </p>
          </div>

          {/* STATS */}
          <div
            className={`
    col-span-3 col-start-1 md:col-start-2 py-4 px-4 sm:px-6 flex justify-between items-center rounded-lg mt-6 shadow-lg transition-colors
    ${theme === "dark" ? "bg-[#141c2f]" : "bg-gray-100"}
  `}
          >
            <UserStat
              label="Repos"
              number={user.public_repos ?? 8}
              theme={theme}
              className="flex-1 text-center break-words"
            />
            <UserStat
              label="Followers"
              number={user.followers ?? 3000}
              theme={theme}
              className="flex-1 text-center break-words"
            />
            <UserStat
              label="Following"
              number={user.following ?? 9}
              theme={theme}
              className="flex-1 text-center break-words"
            />
          </div>

          {/* META LINKS */}
          <div
            className={`col-span-3 col-start-1 md:col-start-2 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-16 mt-6`}
          >
            <UserMeta
              icon={<IconLocation />}
              text={user.location}
              className="space-x-5"
              theme={theme}
            />
            <UserMeta
              icon={<IconTwitter />}
              text={user.twitter_username}
              link={
                user.twitter_username
                  ? `https://twitter.com/${user.twitter_username}`
                  : null
              }
              theme={theme}
            />
            <UserMeta
              icon={<IconWebsite />}
              text={user.blog}
              link={user.blog}
              className="space-x-4"
              theme={theme}
            />
            <UserMeta
              icon={<IconCompany />}
              text={user.company}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

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

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

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
          : "bg-white text-dark-primary-800"
      }`}
    >
      <div className="w-full max-w-screen-md 2xl:max-w-[840px] mx-auto py-4 px-4 sm:px-8">
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
        <div className="w-full mt-10">
          <form onSubmit={handleSubmit}>
            <div className="w-full relative">
              <IconSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-primary-500" />
              <input
                type="text"
                name="username"
                className="w-full bg-dark-primary-600 dark:bg-white border-0 leading-10 py-4 rounded-xl pl-20 text-lg tracking-wider placeholder:text-inherit text-black dark:text-light-secondary"
                placeholder="Search GitHub username..."
                defaultValue={username}
              />
              <button className="bg-primary-500 hover:bg-primary-600 text-white leading-8 py-2.5 px-5 rounded-xl font-semibold tracking-wide absolute right-3.5 top-1/2 -translate-y-1/2 transition">
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="bg-dark-primary-600 dark:bg-white rounded-xl mt-8 py-[3.25rem] px-4 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-y-4 gap-x-10 transition-colors">
          <div className="col-span-1 flex justify-center md:block md:relative">
            <img
              src={user.avatar_url || octocat}
              alt={user.login || "octocat"}
              className="w-24 h-24 rounded-full md:absolute md:-top-[0.55rem] md:w-full"
            />
          </div>
          <div className="col-span-3 flex flex-col md:flex-row items-start justify-between mt-6 md:mt-0">
            <div>
              <h2 className="text-[1.65rem] font-semibold leading-5">
                {user.name || "The Octocat"}
              </h2>
              <span className="text-primary-500 inline-block mt-2.5">
                @{user.login || "octocat"}
              </span>
            </div>
            <div>
              <p>
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
          <div className="col-span-3 col-start-1 md:col-start-2 mt-6 md:mt-0">
            <p>{user.bio || "This profile has no bio"}</p>
          </div>
          <div className="col-span-3 col-start-1 md:col-start-2 bg-dark-primary-800 dark:bg-gray-200 py-4 px-6 grid grid-cols-3 gap-x-6 rounded-lg mt-6 shadow-lg transition-colors">
            <UserStat label="Repos" number={user.public_repos ?? 8} />
            <UserStat label="Followers" number={user.followers ?? 3000} />
            <UserStat label="Following" number={user.following ?? 9} />
          </div>
          <div className="col-span-3 col-start-1 md:col-start-2 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-16 mt-6 text-white dark:text-dark-primary-800">
            <UserMeta
              icon={<IconLocation />}
              text={user.location}
              className="space-x-5"
            />
            <UserMeta
              icon={<IconTwitter />}
              text={user.twitter_username}
              link={
                user.twitter_username
                  ? `https://twitter.com/${user.twitter_username}`
                  : null
              }
            />
            <UserMeta
              icon={<IconWebsite />}
              text={user.blog}
              link={user.blog}
              className="space-x-4"
            />
            <UserMeta icon={<IconCompany />} text={user.company} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

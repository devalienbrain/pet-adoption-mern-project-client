import useTheme from "../hooks/useTheme";

const ThemeToggle = () => {
  const [toggleTheme, theme] = useTheme();
  return (
    <div
      onClick={toggleTheme}
      className={`p-1 my-1 rounded-2xl ${
        theme === "light" ? "bg-black" : "bg-white"
      }`}
    >
      <div
        className={`mr-3 rounded-full shadow-2xl w-3 h-3 bg-black ${
          theme === "light" ? "hidden" : ""
        }`}
      ></div>
      <div
        className={`ml-3 rounded-full shadow-2xl w-3 h-3 bg-white ${
          theme === "dark" ? "hidden" : ""
        }`}
      ></div>
    </div>
  );
};

export default ThemeToggle;

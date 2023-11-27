import { Link, NavLink } from "react-router-dom";
import logo from "../../../public/Resources/pet.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut();
  };
  const links = (
    <>
      <div className="flex flex-row gap-4">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-purple-600  font-bold" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/allpets"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-600 font-bold" : ""
          }
        >
          Pet listings
        </NavLink>
        <NavLink
          to="/allbooks"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-600 font-bold" : ""
          }
        >
          Donation campaigns
        </NavLink>
      </div>
    </>
  );

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const html = document.documentElement;
    if (theme === "light") {
      html.setAttribute("data-theme", "dark");
      html.classList.remove("light");
      html.classList.add("dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
      html.classList.remove("dark");
      html.classList.add("light");
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
    // console.log("Previous Theme:", theme);
  };

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme") || "light";
    setTheme(localStorageTheme);
    const html = document.documentElement;
    html.setAttribute("data-theme", localStorageTheme);
    html.classList.add(localStorageTheme);
    // console.log("Local Storage Theme:", localStorageTheme);
  }, []);

  return (
    <div
      key={toggleTheme}
      className={` ${
        theme === "light" ? "bg-white" : ""
      } sticky top-0 z-50 py-7 grid grid-cols-1 md:grid-cols-4`}
    >
      <div className="flex justify-center md:justify-start items-center gap-1">
        <img className="w-8" src={logo} />
        <div className="text-lg font-black bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 bg-clip-text text-transparent">
          PAWSPALACE
        </div>
      </div>
      <div className="col-span-2 flex justify-center items-center gap-3">
        {links}
      </div>
      <div className="flex gap-4 justify-end items-center">
        {user ? (
          <div className="justify-end flex items-center gap-2">
            <div className="text-right">
              <p>{user?.displayName}</p>
              <button onClick={handleLogOut}>Logout</button>
            </div>
            <img className="w-7 h-7 rounded-full" src={user?.photoURL} />
          </div>
        ) : (
          <Link to="/login" className="font-semibold">
            Login
          </Link>
        )}
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
        ;
      </div>
    </div>
  );
};

export default Header;

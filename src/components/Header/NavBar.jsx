import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../public/Resources/pet.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { SlMenu } from "react-icons/sl";
import useTheme from "../../hooks/useTheme";
import useAdmin from "../../hooks/useAdmin";
const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    navigate("/");
  };
  const links = (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-red-600  font-bold" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/allpets"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-red-600 font-bold" : ""
          }
        >
          Pet listings
        </NavLink>
        <NavLink
          to="/donationCampaigns"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-red-600 font-bold" : ""
          }
        >
          Donation campaigns
        </NavLink>
      </div>
    </>
  );

  // THEME TOGGLE CODE STARTS
  const { theme, setTheme } = useTheme();

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
  // THEME TOGGLE CODE ENDS
  const [isAdmin] = useAdmin();
  return (
    <div
      className={` ${
        theme === "light" ? "bg-white" : "bg-slate-950"
      } sticky top-0 z-50 py-5 grid grid-cols-1 md:grid-cols-4`}
    >
      <div className="flex justify-start items-center gap-1">
        {/* DROPDOWN HAMBURGER MENU FOR MOBILE RESPONSIVE STARTS */}
        <div className="md:hidden dropdown">
          <label tabIndex={0} className="btn btn-ghost ">
            <SlMenu></SlMenu>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box"
          >
            <div className="text-left">{links}</div>
          </ul>
        </div>
        {/* DROPDOWN HAMBURGER MENU FOR MOBILE RESPONSIVE ENDS */}
        <div className="md:pl-5 flex items-center gap-2">
          <img className="w-8" src={logo} />
          <h1 className="text-xl font-black">
            <span className="text-2xl">P</span>AWS
            <span className="text-2xl">P</span>ALACE
          </h1>
        </div>
      </div>
      <div className="hidden md:flex col-span-2  justify-center items-center gap-3 text-base font-semibold">
        {links}
      </div>
      <div className="flex gap-4 justify-end items-center">
        {user ? (
          <div className="justify-end flex items-center gap-2 shadow-2xl">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost ">
                <img className="w-8 h-8 rounded-full" src={user?.photoURL} />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm mr-4 dropdown-content mt-3 z-20 p-2 shadow rounded-box w-20"
              >
                <div className="p-5 text-left flex flex-col space-y-3">
                  <p>{user?.displayName}</p>
                  <Link
                    className="font-black hover:underline"
                    to="/dashboard/profile"
                  >
                    Dashboard
                  </Link>

                  <p
                    className="text-red-600 hover:underline hover:text-red-500 font-bold"
                    onClick={handleLogOut}
                  >
                    Logout
                  </p>
                </div>
              </ul>
            </div>
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

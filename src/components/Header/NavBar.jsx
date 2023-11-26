import { Link, NavLink } from "react-router-dom";
import logo from "../../../public/Resources/pet.png";

const Header = () => {
  const links = (
    <>
      <div className="flex flex-row gap-4 font-semibold">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-purple-600  font-bold" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/addbook"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-600 font-bold" : ""
          }
        >
          Pet Listings
        </NavLink>
        <NavLink
          to="/allbooks"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-600 font-bold" : ""
          }
        >
          Donation Campaigns
        </NavLink>
      </div>
    </>
  );
  return (
    <div className="container mx-auto border-b-2 py-7 grid grid-cols-1 md:grid-cols-4">
      <div className="flex justify-center md:justify-start items-center gap-1">
        <img className="w-8" src={logo} />
        <div className="text-lg font-black bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 bg-clip-text text-transparent">
          PAWSPALACE
        </div>
      </div>
      <div className="col-span-2 flex justify-center items-center gap-3">
        {links}
      </div>
      <div className="flex justify-end items-center">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Header;

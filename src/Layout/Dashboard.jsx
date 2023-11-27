import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
// import useCart from "../hooks/useCart";
import NavBar from "../components/Header/NavBar";
const Dashboard = () => {
  // const [cart] = useCart();

  // TODO: get isAdmin value from the database
  const [isAdmin] = useAdmin();

  return (
    <>
      <NavBar></NavBar>
      <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-blue-50 text-red-700 text-xl font-semibold pt-20">
          <div className="text-left"></div>
          <div className="p-8">
            <div className="flex justify-sart"></div>
            <p className="text-2xl font-black"></p>
            <p className="italic text-sm"></p>
          </div>
          <ul className="menu p-4">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <FaHome></FaHome>
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                    <FaUsers></FaUsers>
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                    <FaUsers></FaUsers>
                    All Pets
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                    <FaUsers></FaUsers>
                    All Donations
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/userHome">
                    <FaHome></FaHome>
                    <p className="hover:underline">User Home</p>
                  </NavLink>
                </li>
              </>
            )}
            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <NavLink to="/dashboard/review">
                <FaAd></FaAd>
                <p className="hover:underline">Add a pet</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/cart">
                <FaShoppingCart></FaShoppingCart>
                <p className="hover:underline">My Added Pets</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/reservation">
                <FaUtensils></FaUtensils>
                <p className="hover:underline">Adoption Request</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/reservation">
                <FaCalendar></FaCalendar>
                <p className="hover:underline">Create Donation Campaign</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/bookings">
                <FaSearch></FaSearch>
                <p className="hover:underline">My Donation Campaigns</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/bookings">
                <FaList></FaList>
                <p className="hover:underline">My Donations</p>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

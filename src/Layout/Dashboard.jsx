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
import { Helmet } from "react-helmet-async";
const Dashboard = () => {
  // const [cart] = useCart();

  // TODO: get isAdmin value from the database
  const [isAdmin] = useAdmin();

  return (
    <>
      <Helmet>
        <title>PawsPalace Pet Place | Dashboard</title>
      </Helmet>
      <NavBar></NavBar>
      <div className="flex flex-col md:flex-row">
        {/* dashboard side bar */}
        <div className="w-full md:w-64 min-h-screen bg-blue-50 text-red-700 text-xl font-semibold pt-20">
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
                  <NavLink to="/dashboard/allPetsByAdmin">
                    <FaUsers></FaUsers>
                    All Pets
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addedPets">
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
              <NavLink to="/dashboard/addAPet">
                <FaAd></FaAd>
                <p className="hover:underline">Add a pet</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addedPets">
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
              <NavLink to="/dashboard/createDonation">
                <FaCalendar></FaCalendar>
                <p className="hover:underline">Create Donation Campaign</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/createdCampaigns">
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

import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../pages/login/Login";
import Register from "../pages/Register/Register";
import AllPets from "../pages/PetListing/PetListing";
import PetDetails from "../pages/PetDetails/PetDetails";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers";
import AddAPet from "../pages/Dashboard/AddAPet/AddAPet";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AddedPets from "../pages/Dashboard/AddedPets/AddedPets";
import AllPetsByAdmin from "../pages/Dashboard/AllPetsByAdmin/AllPetsByAdmin";
import CreateDonation from "../pages/Dashboard/CreateDonation/CreateDonation";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import DonationCampaigns from "../pages/DonationCampaigns/DonationCampaigns";
import MyCreatedDonationCampaigns from "../pages/Dashboard/MyDonationCampaigns/MyCreatedDonationCampaigns";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import AllDonationsByAdmin from "../pages/Dashboard/AllDonationsByAdmin/AllDonationsByAdmin";
// import PrivateRoute from "./PrivateRoute";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allpets",
        element: <AllPets></AllPets>,
        loader: () => fetch("http://localhost:5000/petsCount"),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <PetDetails></PetDetails>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:5000/allPets"),
      },
      {
        path: "/donationCampaigns",
        element: <DonationCampaigns></DonationCampaigns>,
      },
      {
        path: "/campaignDetails/:id",
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:5000/donation"),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "allPetsByAdmin",
        element: (
          <AdminRoute>
            <AllPetsByAdmin></AllPetsByAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "allDonationsByAdmin",
        element: (
          <AdminRoute>
            <AllDonationsByAdmin></AllDonationsByAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "userHome",
        element: (
          <PrivateRoute>
            <UserHome></UserHome>
          </PrivateRoute>
        ),
      },
      {
        path: "addAPet",
        element: (
          <PrivateRoute>
            <AddAPet></AddAPet>
          </PrivateRoute>
        ),
      },
      {
        path: "addedPets",
        element: (
          <PrivateRoute>
            <AddedPets></AddedPets>
          </PrivateRoute>
        ),
      },
      {
        path: "createDonation",
        element: (
          <PrivateRoute>
            <CreateDonation></CreateDonation>
          </PrivateRoute>
        ),
      },
      {
        path: "createdCampaigns",
        element: (
          <PrivateRoute>
            <MyCreatedDonationCampaigns></MyCreatedDonationCampaigns>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;

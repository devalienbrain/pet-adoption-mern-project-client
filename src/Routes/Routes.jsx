import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/Register/Register";
import AllPets from "../pages/PetListing/PetListing";
import PetDetails from "../pages/PetDetails/PetDetails";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers";
import AddAPet from "../pages/Dashboard/AddAPet/AddAPet";
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
        element: <PetDetails></PetDetails>,
        loader: () => fetch("http://localhost:5000/allPets"),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "addAPet",
        element: <AddAPet></AddAPet>,
      },
    ],
  },
]);

export default routes;

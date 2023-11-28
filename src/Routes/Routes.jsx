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
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "addAPet",
        element: <AddAPet></AddAPet>,
      },
    ],
  },
]);

export default routes;

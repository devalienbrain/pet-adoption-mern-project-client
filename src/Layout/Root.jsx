import { Outlet } from "react-router-dom";
import "../../src/index.css";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Header/NavBar";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="min-h-screen container mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;

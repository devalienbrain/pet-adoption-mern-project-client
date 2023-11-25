import { Link } from "react-router-dom";
import { BiErrorAlt } from "react-icons/bi";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center text-left">
      <div className="flex flex-col space-y-11">
        <div>
          <BiErrorAlt></BiErrorAlt>
          <p className="py-5">Oops..</p>
          Page Not Found!
        </div>
        <h2 className="text-5xl md:text-9xl font-black">4 O 4</h2>
        <h1 className="text-xl font-bold"> e r r o r !</h1>
        <Link to={"/"}>
          <div className="flex gap-2 text-sm bg-black py-3 px-5 rounded-xl text-white">
            <span className=" italic font-semibold">click to back home</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

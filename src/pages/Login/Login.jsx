import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import loginImg from "../../../public/Resources/login.png";
// import axios from "axios";

const Login = () => {
  const { signIn, loginGoogle, loginGithub } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);
    e.target.email.value = "";
    e.target.password.value = "";
    setErrorMessage("");
    signIn(email, password)
      .then((res) => {
        // console.log(res.user);
        toast("You Are Successfuly Logged In");

        // Steps to get access token from server side
        const user = { email };
        axios
          .post("http://localhost:5000/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            navigate(location?.state ? location.state : "/");
          });
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      });
  };

  const handleGoogleLogin = () =>
    loginGoogle()
      .then((res) => {
        console.log(res.user);
        toast("You Are Successfuly Logged In");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => console.log(err));

  const handleGithubLogin = () =>
    loginGithub()
      .then((res) => {
        console.log(res.user);
        toast("You Are Successfuly Logged In");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => console.log(err));

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-20">
          <img className="w-full h-full" src={loginImg} />
        </div>
        <div className="flex-1 flex justify-center items-center p-5">
          <div className="hero min-h-screen py-10 px-5">
            <div className="hero-content flex-col">
              <h2 className="text-2xl font-black bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 text-transparent bg-clip-text">
                Login with
              </h2>

              <div className="card w-full shadow-2xl bg-base-100 py-9">
                <form
                  onSubmit={handleLogin}
                  className="flex flex-col gap-4 px-5 py-5"
                >
                  <div className="mx-auto font-semibold text-center w-full text-black rounded-lg">
                    <button
                      onClick={handleGithubLogin}
                      className="p-3 border font-bold w-full rounded-lg border-black flex justify-center items-center gap-3"
                    >
                      <FaGithub></FaGithub>
                      <span className="hover:underline">Github</span>
                    </button>
                  </div>
                  <div className="mx-auto font-semibold text-center w-full border-black-900 rounded-lg">
                    <button
                      onClick={handleGoogleLogin}
                      className="p-3 border font-bold w-full rounded-lg border-black flex justify-center items-center gap-3"
                    >
                      <FcGoogle></FcGoogle>
                      <span className="hover:underline">Google</span>
                    </button>
                  </div>
                  <h2 className="text-center text-blue-900 py-5 border-b-2 border-t-2">
                    Or,
                  </h2>
                  <h2 className="text-xs font-black">exisiting email</h2>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered w-full"
                  />
                  <div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="password"
                      className="input input-bordered w-full"
                    />
                    <span
                      onClick={handlePasswordVisibility}
                      className="absolute -ml-7 mt-4"
                    >
                      {showPassword ? (
                        <FaEye></FaEye>
                      ) : (
                        <FaEyeSlash></FaEyeSlash>
                      )}
                    </span>
                  </div>
                  <div className="form-control mt-6">
                    <button className="p-3 rounded-lg bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 text-white font-black hover:bg-gradient-to-l">
                      Login
                    </button>
                  </div>
                </form>
                {errorMessage && (
                  <p className="text-center font-black text-red-500 mb-5 px-4">
                    ERROR: {errorMessage}
                  </p>
                )}
                <p className="text-purple-900 font-bold text-center text-base mb-5 px-4">
                  Not register before?{" "}
                  <Link to="/register"> please register first </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../Provider/AuthProvider";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// import loginImg from "../../../public/Resources/login.png";
// import axios from "axios";

// const Login = () => {
//   const { signIn, loginGoogle, loginGithub } = useContext(AuthContext);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     console.log(email, password);
//     e.target.email.value = "";
//     e.target.password.value = "";
//     setErrorMessage("");
//     signIn(email, password)
//       .then((res) => {
//         console.log(res.user);
//         toast("You Are Successfuly Logged In");

//         // Steps to get access token from server side
//         const user = { email };
//         axios
//           .post("http://localhost:5000/jwt", user, {
//             withCredentials: true,
//           })
//           .then((res) => {
//             console.log(res.data);
//             navigate(location?.state ? location.state : "/");
//           });
//       })
//       .catch((error) => {
//         console.error(error);
//         setErrorMessage(error.message);
//       });
//   };

//   const handleGoogleLogin = () =>
//     loginGoogle()
//       .then((res) => {
//         console.log(res.user);
//         toast("You Are Successfuly Logged In");
//         navigate(location?.state ? location.state : "/");
//       })
//       .catch((err) => console.log(err));

//   const handleGithubLogin = () =>
//     loginGithub()
//       .then((res) => {
//         console.log(res.user);
//         toast("You Are Successfuly Logged In");
//         navigate(location?.state ? location.state : "/");
//       })
//       .catch((err) => console.log(err));

//   const handlePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <>
//       <ToastContainer></ToastContainer>
//       <div className="flex flex-col md:flex-row">
//         <div className="flex-1 p-20">
//           <img className="w-full h-full" src={loginImg} />
//         </div>
//         <div className="flex-1 flex justify-center items-center p-5">
//           <div className="hero min-h-screen py-10 px-5">
//             <div className="hero-content flex-col">
//               <h2 className="text-2xl font-black bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 text-transparent bg-clip-text">
//                 Login with
//               </h2>

//               <div className="card w-full shadow-2xl bg-base-100 py-9">
//                 <form
//                   onSubmit={handleLogin}
//                   className="flex flex-col gap-4 px-5 py-5"
//                 >
//                   <div className="mx-auto font-semibold text-center w-full rounded-lg hover:shadow-2xl">
//                     <button
//                       onClick={handleGithubLogin}
//                       className="p-3 border font-bold w-full rounded-lg border-black flex justify-center items-center gap-3"
//                     >
//                       <FaGithub></FaGithub>
//                       <span className="hover:underline">Github</span>
//                     </button>
//                   </div>
//                   <div className="mx-auto font-semibold text-center w-full border-black-900 rounded-lg hover:shadow-2xl">
//                     <button
//                       onClick={handleGoogleLogin}
//                       className="p-3 border font-bold w-full rounded-lg border-black flex justify-center items-center gap-3"
//                     >
//                       <FcGoogle></FcGoogle>
//                       <span className="hover:underline">Google</span>
//                     </button>
//                   </div>
//                   <h2 className="text-center  py-2 my-3 border-b border-t">
//                     Or
//                   </h2>
//                   <h2 className="text-xs font-black">exisiting email</h2>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="email"
//                     className="input input-bordered w-full"
//                   />
//                   <div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       placeholder="password"
//                       className="input input-bordered w-full"
//                     />
//                     <span
//                       onClick={handlePasswordVisibility}
//                       className="absolute -ml-7 mt-4"
//                     >
//                       {showPassword ? (
//                         <FaEye></FaEye>
//                       ) : (
//                         <FaEyeSlash></FaEyeSlash>
//                       )}
//                     </span>
//                   </div>
//                   <div className="form-control mt-6">
//                     <button className="p-3 rounded-lg bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 text-white font-black hover:bg-gradient-to-l">
//                       Login
//                     </button>
//                   </div>
//                 </form>
//                 {errorMessage && (
//                   <p className="text-center font-black text-red-500 mb-5 px-4">
//                     ERROR: {errorMessage}
//                   </p>
//                 )}
//                 <p className="text-lime-500 font-bold text-center text-sm mb-5 px-4">
//                   Not register before?{" "}
//                   <Link to="/register"> please register first </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import loginImg from "../../../public/Resources/login.png";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Login = () => {
  const { signIn, loginGoogle, loginGithub } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      });
  };

  const handleGoogleLogIn = () => {
    loginGoogle().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };
      fetch(
        // "http://localhost:5000/users"
        "https://pawspalace-pet-adoption-server.vercel.app/users",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        }
      )
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };

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
      <Helmet>
        <title>PawsPalace Pet Place | Login</title>
      </Helmet>
      <div className="hero flex flex-col lg:flex-row min-h-screen">
        <div className="hero-content p-16 flex-1 flex-col md:flex-row-reverse">
          <img className="" src={loginImg} alt="Login" />
        </div>
        <div className="card flex-1 max-w-sm shadow-2xl bg-base-100 p-10">
          <h2 className="text-2xl font-black bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 text-transparent bg-clip-text">
            Login with
          </h2>
          <form onSubmit={handleLogin} className="card-body">
            <div className="mx-auto font-semibold text-center w-full border-black-900 rounded-lg">
              <button
                onClick={handleGoogleLogIn}
                className="p-3 border font-bold w-full rounded-lg border-black flex justify-center items-center gap-3"
              >
                <FcGoogle></FcGoogle>
                <span className="hover:text-blue-500">Google</span>
              </button>
            </div>
            <div className="mx-auto font-semibold text-center w-full rounded-lg">
              <button
                onClick={handleGithubLogin}
                className="p-3 border font-bold w-full rounded-lg border-black flex justify-center items-center gap-3"
              >
                <FaGithub></FaGithub>
                <span className="hover:text-blue-800">Github</span>
              </button>
            </div>
            <h2 className="bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 text-transparent bg-clip-text text-center  py-2 my-3 border-b border-t">
              Or
            </h2>
            <h2 className="text-sm font-bold">exisiting email and password</h2>
            <div className="form-control">
              <input
                type="email"
                name="email"
                placeholder="enter your email"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
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
                  {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                </span>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="p-3 rounded-lg bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 text-white font-black hover:bg-gradient-to-l">
                Login
              </button>
            </div>
          </form>
          <div>
            {errorMessage && (
              <p className="text-center font-bold text-sm text-red-600 mb-5 px-4">
                ERROR: {errorMessage}
              </p>
            )}
          </div>
          <p className="text-lime-500 font-bold text-center text-sm mb-5 px-4">
            Not a registered user?
            <Link to="/register"> register first </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

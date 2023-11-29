// import { FaEye, FaEyeSlash } from "react-icons/fa";

// import { Link, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../Provider/AuthProvider";
// import { updateProfile } from "firebase/auth";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// import signUpImg from "../../../public/Resources/signUp.png";

// const Register = () => {
//   const { createUser } = useContext(AuthContext);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const handleRegister = (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     const name = e.target.name.value;
//     const photo = e.target.photo.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     e.target.name.value = "";
//     e.target.photo.value = "";
//     e.target.email.value = "";
//     e.target.password.value = "";
//     e.target.checkbox.checked = false;
//     console.log(name, email, password);

//     setErrorMessage("");

//     if (!/^(?=.*[A-Z])(?=.*\d{6,})(?=.*[^A-Za-z0-9]).*$/.test(password)) {
//       setErrorMessage(
//         "Password must contain at least one uppercase letter, one special character, and be at least 6 characters long."
//       );
//       return;
//     }

//     createUser(email, password)
//       .then((res) => {
//         console.log(res.user);
//         setTimeout(() => {
//           document.location.reload();
//         }, 5000);
//         toast("Congratulations! Your Registration Is Successful!");
//         navigate("/");
//         updateProfile(res.user, {
//           displayName: name,
//           photoURL: photo,
//         });
//       })
//       .then(() => {
//         console.log("Profile Updated");
//       })
//       .catch((error) => {
//         console.error(error);
//         setErrorMessage(error.message);
//       });
//   };

//   const handlePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <>
//       <ToastContainer></ToastContainer>
//       <div className="flex flex-col-reverse md:flex-row">
//         <div className="flex-1 flex justify-center items-center p-2">
//           <div className="hero min-h-screen">
//             <div className="hero-content flex-col">
//               <div className="card w-full shadow-2xl">
//                 <form
//                   onSubmit={handleRegister}
//                   className="flex flex-col gap-4 px-5 py-9"
//                 >
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Your name"
//                     className="input input-bordered"
//                     required
//                   />
//                   <input
//                     type="text"
//                     required
//                     name="photo"
//                     placeholder="Photo URL"
//                     className="input input-bordered"
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="email"
//                     className="input input-bordered"
//                     required
//                   />
//                   <div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       placeholder="password"
//                       className="input input-bordered"
//                       required
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
//                   <div className="text-xs flex align-middle justify-center">
//                     <input
//                       type="checkbox"
//                       name="checkbox"
//                       id="chk"
//                       className="mr-2"
//                       required
//                     />
//                     <label htmlFor="chk">
//                       Accept the <a href="">terms and conditions</a>{" "}
//                     </label>
//                   </div>
//                   <div className="form-control mt-6">
//                     <button className="btn border bg-gradient-to-r from-red-500 via-green-800 to-lime-600 text-white font-bold hover:bg-gradient-to-bl">
//                       REGISTER
//                     </button>
//                   </div>
//                 </form>

//                 {errorMessage && (
//                   <p className="text-center font-black text-red-500 mb-5 px-4">
//                     ERROR: {errorMessage}
//                   </p>
//                 )}
//                 <p className="text-center text-sm text-red-500 mb-5">
//                   Alreadey registered? <Link to="/login"> then login </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 p-20">
//           <h2 className=" text-2xl font-black bg-gradient-to-r from-green-700 via-red-600 to-lime-800 text-transparent bg-clip-text uppercase">
//             Just one click and join this proud community
//           </h2>
//           <img className="w-full h-full object-contain" src={signUpImg} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;

import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import signUpImg from "../../../public/Resources/signUp.png";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
            photoURL: data.photoURL,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>PawsPalace Pet Place | Register</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1 p-20">
            <h2 className=" text-2xl font-black bg-gradient-to-r from-green-700 via-red-600 to-lime-800 text-transparent bg-clip-text uppercase">
              You are just one click away to join our global community
            </h2>
            <img className="w-full h-full object-contain" src={signUpImg} />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-5 py-10">
            <h2 className="text-2xl font-black bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 text-transparent bg-clip-text">
              Please register
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-gradient-to-r from-green-700 via-lime-700 to-red-600 text-white"
                  type="submit"
                  value="REGISTER"
                />
              </div>
            </form>
            <p className="px-6">
              <small>
                Already have an account <Link to="/login">Login</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

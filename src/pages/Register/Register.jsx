import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import signUpImg from "../../../public/Resources/signUp.png";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    e.target.name.value = "";
    e.target.photo.value = "";
    e.target.email.value = "";
    e.target.password.value = "";
    e.target.checkbox.checked = false;
    console.log(name, email, password);

    setErrorMessage("");

    if (!/^(?=.*[A-Z])(?=.*\d{6,})(?=.*[^A-Za-z0-9]).*$/.test(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter, one special character, and be at least 6 characters long."
      );
      return;
    }

    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        setTimeout(() => {
          document.location.reload();
        }, 5000);
        toast("Congratulations! Your Registration Is Successful!");
        navigate("/");
        updateProfile(res.user, {
          displayName: name,
          photoURL: photo,
        });
      })
      .then(() => {
        console.log("Profile Updated");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      });
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-1 flex justify-center items-center p-2">
          <div className="hero min-h-screen">
            <div className="hero-content flex-col">
              <div className="card w-full shadow-2xl">
                <form
                  onSubmit={handleRegister}
                  className="flex flex-col gap-4 px-5 py-9"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="input input-bordered"
                    required
                  />
                  <input
                    type="text"
                    required
                    name="photo"
                    placeholder="Photo URL"
                    className="input input-bordered"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                  <div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="password"
                      className="input input-bordered"
                      required
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
                  <div className="text-xs flex align-middle justify-center">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="chk"
                      className="mr-2"
                      required
                    />
                    <label htmlFor="chk">
                      Accept the <a href="">terms and conditions</a>{" "}
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn border bg-gradient-to-r from-red-500 via-green-800 to-lime-600 text-white font-bold hover:bg-gradient-to-bl">
                      REGISTER
                    </button>
                  </div>
                </form>

                {errorMessage && (
                  <p className="text-center font-black text-red-500 mb-5 px-4">
                    ERROR: {errorMessage}
                  </p>
                )}
                <p className="text-center text-sm text-red-500 mb-5">
                  Alreadey registered? <Link to="/login"> then login </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-20">
          <h2 className=" text-2xl font-black bg-gradient-to-r from-green-700 via-red-600 to-lime-800 text-transparent bg-clip-text uppercase">
            Just one click and join this proud community
          </h2>
          <img className="w-full h-full object-contain" src={signUpImg} />
        </div>
      </div>
    </>
  );
};

export default Register;

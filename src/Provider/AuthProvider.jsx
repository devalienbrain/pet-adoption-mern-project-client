import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../../public/firebase/firebase.config";
// import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const loginGithub = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // const handleBookQuatityCount = (changedQuantity, id) => {
  //   fetch(
  //     // `https://library-management-devalienbrain-crud-jwt-server.vercel.app/allBooks/${id}`,
  //     `http://localhost:5000/allBooks/${id}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({ quantity: changedQuantity }),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data);
  //     });
  // };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // const userEmail = currentUser?.email || user?.email;
      // const loggedUser = { email: userEmail };
      // console.log("Current Active USER:", currentUser);
      setUser(currentUser);
      setLoading(false);

      // IF USER EXISTS PROVIDE A TOKEN
      // if (currentUser) {
      //   axios
      //     .post("http://localhost:5000/jwt", loggedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log("Token Response: ", res.data);
      //     });
      // } else {
      //   axios
      //     .post("http://localhost:5000/logout", loggedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log("Token Response For LogOut: ", res.data);
      //     });
      // }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    loginGoogle,
    loginGithub,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

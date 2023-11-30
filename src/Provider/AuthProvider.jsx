import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../../public/firebase/firebase.config";
import axios from "axios";

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

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current Active USER:", currentUser);
      setUser(currentUser);

      // get and set token
      if (currentUser) {
        axios
          .post(
            // "http://localhost:5000/jwt"
            "https://pawspalace-pet-adoption-server.vercel.app/jwt",
            { email: currentUser.email }
          )
          .then((res) => {
            console.log(res.data.token);
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
      }
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
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

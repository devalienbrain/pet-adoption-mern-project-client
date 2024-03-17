import { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Provider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Helmet>
        <title>PawsPalace | Profile</title>
      </Helmet>
      <div className={`lg:p-10 text-white rounded-lg`}>
        <div>
          <img
            className="h-[150px] w-[150px] rounded-full ring-4 ring-gray-400 mx-auto my-10"
            src={
              user?.photoURL
                ? user?.photoURL
                : "https://i.ibb.co/t23zmR8/Logo.png"
            }
            alt=""
          />
        </div>
        <h1 className="text-center text-xl font-semibold">
          Name: {user?.displayName}
        </h1>
        <div className="flex justify-center py-3 gap-2">
          <h2>E-mail</h2>
          <h2>{user?.email ? user?.email : "E-imail@mail.com"}</h2>
        </div>
      </div>
    </>
  );
};

export default Profile;

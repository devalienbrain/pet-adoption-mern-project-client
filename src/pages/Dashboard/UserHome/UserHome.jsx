import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div className="flex justify-center py-16">
      <h1 className="text-xl md:text-3xl bg-gradient-to-r from-green-500 via-lime-800 to-blue-900 bg-clip-text text-transparent text-center font-black uppercase py-10">
        Welcome {user?.displayName} <br /> to your user dashboard!
      </h1>
    </div>
  );
};

export default UserHome;

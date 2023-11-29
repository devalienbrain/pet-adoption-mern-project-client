import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  return (
    <div className="flex justify-center py-16">
      <h1 className="text-xl md:text-3xl bg-gradient-to-r from-pink-500 via-red-500 to-red-900 bg-clip-text text-transparent text-center font-black uppercase py-10">
        Welcome back {user?.displayName} <br /> to your admin dashboard!
      </h1>
    </div>
  );
};

export default AdminHome;

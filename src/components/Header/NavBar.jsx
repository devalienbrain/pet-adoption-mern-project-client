import logo from "../../../public/Resources/pawlogo.png";

const Header = () => {
  return (
    <div className="border border-b-2">
      <div className="container mx-auto flex justify-center md:justify-start items-center gap-2 py-3">
        <img className="w-9 rounded-full" src={logo} />
        <div className="normal-case text-xl font-black">pawspalace</div>
      </div>
    </div>
  );
};

export default Header;

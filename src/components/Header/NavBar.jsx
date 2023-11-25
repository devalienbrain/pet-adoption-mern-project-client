import logo from "../../../public/Resources/pet.png";

const Header = () => {
  return (
    <div className="container mx-auto border-b-2 py-3">
      <div className="flex justify-center md:justify-start items-center gap-1">
        <img className="w-10" src={logo} />
        <div className="text-2xl font-black">pawspalace</div>
      </div>
    </div>
  );
};

export default Header;

import logo from "../../../public/Resources/pet.png";

const Header = () => {
  return (
    <div className="container mx-auto border-b-2 py-7">
      <div className="flex justify-center md:justify-start items-center gap-1">
        <img className="w-8" src={logo} />
        <div className="text-xl font-black">PAWSPALACE</div>
      </div>
    </div>
  );
};

export default Header;

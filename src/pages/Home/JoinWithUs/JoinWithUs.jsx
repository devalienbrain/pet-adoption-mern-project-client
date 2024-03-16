import joinUsImg from "../../../../public/Resources/JoinUs/joinUsBanner.png";
const JoinWithUs = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-10">
          <img className="w-full h-full" src={joinUsImg} />
        </div>
        <div className="flex-1 flex justify-center items-center p-5">
          <div className="text-center">
            <h1 className="mb-5 text-2xl md:text-5xl bg-gradient-to-r from-red-700 via-blue-600 to-purple-700 bg-clip-text text-transparent font-bold">
              BECOME A HUMAN HERO
            </h1>
            <span className="text-xs md:text-sm">
              Discover the immeasurable joy of companionship and the
              transformative power of love by adopting a pet into your life
              today
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinWithUs;

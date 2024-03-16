import bannerImg from "../../../../public/Resources/BannerImg/bannerImg.png";
const Banner = () => {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row py-10">
        <div className="flex-1 flex justify-center items-center p-5">
          <div className="text-center md:text-left">
            <h1 className="mb-5 text-3xl md:text-7xl  font-black">
              PLANNING TO ADOPT A PET?
            </h1>
            <span className="text-lg md:text-xl">
              Find your adoptions here. Browse pets from our network of over
              11,500 shelters and rescues.
            </span>
          </div>
        </div>
        <div className="flex-1">
          <img className="w-full h-full" src={bannerImg} />
        </div>
      </div>
    </div>
  );
};

export default Banner;

import bannerImg from "../../../../public/Resources/BannerImg/bannerImg.avif";
const Banner = () => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="flex-1">
          <img className="w-full h-full" src={bannerImg} />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center md:text-left">
            <h1 className="mb-5 text-2xl md:text-5xl text-black font-bold">
              PLANNING TO ADOPT A PET?
            </h1>
            <span>
              Browse pets from our network of over 11,500 shelters and rescues.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

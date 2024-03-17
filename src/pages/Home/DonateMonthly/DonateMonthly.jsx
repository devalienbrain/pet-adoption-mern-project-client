import bannerImg from "../../../../public/Resources/donateImg.png";
const DonateMonthly = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex justify-center items-center p-5">
          <div className="text-center md:text-left">
            <h1 className="mb-5 text-2xl md:text-4xl  font-black">
              DONATE MONTHLY TO HELP ANIMALS
            </h1>
            <span>
              Just $5 a month (or whatever you can afford) will make an impact
              in the ongoing fight to ensure safety and protect all pet animals.
            </span>
          </div>
        </div>
        <div className="flex-1 p-10">
          <img className="w-full h-full" src={bannerImg} />
        </div>
      </div>
    </div>
  );
};

export default DonateMonthly;

import { Link } from "react-router-dom";

const AllDonationCampaignsDisplayCard = ({ aDonationCampaign }) => {
  const { _id, campaignName, image, maxAmount, petName, lastDate } =
    aDonationCampaign;
  return (
    <div className="card bg-base-100 border border-red-100">
      <h2 className="card-title mx-auto p-3 bg-gradient-to-r from-pink-500 via-red-500 to-red-900 bg-clip-text text-transparent">
        Campaign Name: {campaignName}
      </h2>
      <figure>
        <img
          className="w-80 h-80 object-contain rounded-md"
          src={image}
          alt="Donation"
        />
      </figure>
      <div className="card-body text-center">
        <p className="text-red">
          Maximum Donation Amount:
          <span className="font-bold"> $ {maxAmount}</span>{" "}
        </p>
        <p className="font-bold bg-gradient-to-r  bg-clip-text text-transparent  from-blue-500 to-red-900 ">
          Pet Name: {petName}
        </p>
        <p className="text-red-600 font-bold">Last Date: {lastDate}</p>
        <div className="card-actions justify-center">
          <Link to={`/campaignDetails/${_id}`}>
            <button className="py-3 px-7 text-blue-700 text-sm uppercase rounded-2xl bg-green-50 hover:text-blue-800">
              Campaign Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllDonationCampaignsDisplayCard;

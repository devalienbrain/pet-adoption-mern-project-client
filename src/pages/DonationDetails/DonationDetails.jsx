import { useLoaderData, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Payment from "../Payment/Payment";

const DonationDetails = () => {
  const { user } = useContext(AuthContext);
  const donations = useLoaderData();
  const { id } = useParams();
  // const navigate = useNavigate();
  const targetedCampaign = donations.find((pet) => id === pet._id);
  // console.log(targetedPet);
  const {
    campaignName,
    image,
    petName,
    longDescription,
    lastDate,
    maxAmount,
    _id,
  } = targetedCampaign || {};

  // Handle the modal
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const handlesubmit = (e) => {
    e.preventDefault();
    openModal();
  };
  const data = { amount: maxAmount, user };

  return (
    <>
      <div className="container mx-auto min-h-screen flex justify-center items-center align-middle">
        <div className="p-10 rounded">
          <div className="card lg:card-side bg-base-100 shadow-lg">
            <figure className="w-full lg:w-1/2">
              <img src={image} alt="book" />
            </figure>
            <div className="w-full lg:w-1/2 card-body text-left italic flex flex-col space-y-3 ">
              <h2 className="card-title text-red-500">
                Campaign name: {campaignName}
              </h2>
              <h2 className="card-title text-red-600">
                Last Date Of Donation: {lastDate}
              </h2>
              <h2 className="card-title text-red-900">
                Maximum Amount To Donate: {maxAmount}
              </h2>
              <h2 className="card-title">Pet Name: {petName}</h2>

              <div>Details: {longDescription}</div>
              <div className="flex gap-1">
                <button
                  onClick={handlesubmit}
                  className="px-5 py-2 bg-black  text-white
                hover:text-slate-200 rounded-md drop-shadow-2xl text-sm font-semibold"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <Payment data={data} closeModal={closeModal} isOpen={isOpen} />
      </div>
    </>
  );
};

export default DonationDetails;

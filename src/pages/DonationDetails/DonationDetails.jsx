import { Link, useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // HANDLE DONATE BTN CLICKED
  const [adoptedPets, setAdoptedPets] = useState([]);
  const handlePetAdoption = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.name.value;
    const userEmail = form.email.value;
    const phoneNumber = form.phone.value;
    const address = form.address.value;

    const petAdoptInfo = {
      originalPetId: _id,
      petName: name,
      category,
      userName,
      userEmail,
      phoneNumber,
      address,
    };
    console.log(petAdoptInfo);
    // Info send to db
    fetch("http://localhost:5000/adoptedPets", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(petAdoptInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Congrats!",
            text: "You have adopted the pet Successfully",
            icon: "success",
            confirmButtonText: "Close",
          });
        }
      });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container mx-auto min-h-screen flex justify-center items-center align-middle">
        <div className="p-10 rounded">
          <div className="card lg:card-side bg-base-100 shadow-lg">
            <figure>
              <img src={image} alt="book" />
            </figure>
            <div className="card-body text-left italic flex flex-col space-y-3">
              <h2 className="card-title">Campaign name: {campaignName}</h2>
              <h2 className="card-title">Last Date Of Donation: {lastDate}</h2>
              <h2 className="card-title">
                Maximum Amount To Donate: {maxAmount}
              </h2>
              <h2 className="card-title">Pet Name: {petName}</h2>

              <div>Details: {longDescription}</div>
              <div className="flex gap-1">
                <button
                  onClick={openModal}
                  className="px-4 py-2 bg-red-800  text-white
                hover:text-red-700 rounded-lg drop-shadow-2xl text-sm font-semibold"
                >
                  DONATE NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL PART */}
        {isModalOpen && (
          <div className="modal-container">
            <dialog
              id="To_Donate"
              className="modal modal-bottom sm:modal-middle"
              open
            >
              <div className="modal-box bg-red-200 shadow-lg text-purple-900">
                <h3 className="font-black text-lg text-green-700">
                  Please fill required information first
                </h3>
                <form
                  // onSubmit={handlePetAdoption}
                  className="flex flex-col gap-4 px-5 py-9"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    defaultValue={user?.displayName}
                    className="input input-bordered text-blue-600"
                    required
                    disabled
                  />
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                    placeholder="email"
                    className="input input-bordered text-blue-600"
                    required
                    disabled
                    // readOnly
                  />
                  <input
                    type="number"
                    name="phone"
                    placeholder="amount to donate"
                    className="input input-bordered text-blue-600"
                    required
                  />
                  <div className="form-control mt-6">
                    <button className="btn bg-green-800 hover:bg-green-700 text-white">
                      submit
                    </button>
                  </div>
                </form>
                <div className="flex justify-center">
                  <div className="modal-action">
                    <p
                      onClick={closeModal}
                      className="underline text-xs italic text-red-900 hover:text-red-950"
                    >
                      close modal
                    </p>
                  </div>
                </div>
              </div>
            </dialog>
          </div>
        )}
      </div>
    </>
  );
};

export default DonationDetails;

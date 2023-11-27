import { Link, useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const PetDetails = () => {
  const { user } = useContext(AuthContext);
  const pets = useLoaderData();
  const { id } = useParams();
  // const navigate = useNavigate();
  const targetedPet = pets.find((pet) => id === pet._id);
  // console.log(targetedPet);
  const { name, category, _id } = targetedPet || {};

  // Handle the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // HANDLE ADOPT BTN CLICKED
  const [adoptedPets, setAdoptedPets] = useState([]);
  const handlePetAdoption = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.name.value;
    const userEmail = form.email.value;

    const petAdoptInfo = {
      originalPetId: _id,
      petName: name,
      category,
      userName,
      userEmail,
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
    <div className="container mx-auto min-h-screen flex justify-center items-center align-middle">
      <div className="p-10 rounded">
        <div className="card lg:card-side bg-base-100 shadow-lg">
          {/* <figure>
            <img src={image} alt="book" />
          </figure> */}
          <div className="card-body text-left italic">
            <h2 className="card-title">Pet name: {name}</h2>
            <h2 className="card-title">{category}</h2>

            <div className="flex gap-1">
              <button
                onClick={openModal}
                className="px-4 py-2 border border-red-600  text-red-700
                hover:text-red-600 rounded-lg drop-shadow-2xl text-sm font-bold"
              >
                Adopt the pet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PART */}
      {isModalOpen && (
        <div className="modal-container">
          <dialog
            id="To_Adopt_A_Pet"
            className="modal modal-bottom sm:modal-middle"
            open
          >
            <div className="modal-box bg-blue-300 shadow-lg text-purple-900">
              <h3 className="font-black text-lg text-red-700">
                Please fill required information first
              </h3>
              <form
                onSubmit={handlePetAdoption}
                className="flex flex-col gap-4 px-5 py-9"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  defaultValue={user?.displayName}
                  className="input input-bordered text-blue-600"
                  required
                />
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  placeholder="email"
                  className="input input-bordered text-blue-600"
                  required
                  // readOnly
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
                    className="underline text-xs italic text-red-700 hover:text-red-600"
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
  );
};

export default PetDetails;

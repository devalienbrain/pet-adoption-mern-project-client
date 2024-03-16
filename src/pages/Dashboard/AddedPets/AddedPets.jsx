import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddedPets = () => {
  const { user } = useAuth();
  const [addedPets, setAddedPets] = useState([]);

  const axiosSecure = useAxiosSecure();
  const fetchData = async () => {
    const pets = await axiosSecure.get(`/allPets?email=${user?.email}`);
    setAddedPets(pets.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeletePet = (pet) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/addedPets/${pet._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          // refetch to update the ui
          // refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${pet.name} has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="flex justify-evenly my-4 pt-20">
        <h2 className="text-3xl">Your Added Pets List</h2>
        <h2 className="text-3xl">Total Pets: {addedPets.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Pet Name</th>
              <th>Pet Category</th>
              <th>Pet Image</th>
              <th>Adoption Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {addedPets.map((addedPet, index) => (
              <tr key={addedPet._id}>
                <th>{index + 1}</th>
                <td>{addedPet.name}</td>
                <td>{addedPet.category}</td>
                <td>
                  <img
                    className="w-20 h-20 rounded-full"
                    src={addedPet.image}
                  />
                </td>
                <td>Loading</td>
                <td>
                  <div className="flex flex-col space-y-2">
                    <Link to={`/dashboard/updatePet/${addedPet._id}`}>
                      <button className="btn btn-outline">Update</button>
                    </Link>

                    <button
                      onClick={() => handleDeletePet(addedPet)}
                      className="btn btn-secondary"
                    >
                      Delete
                    </button>
                    <button className="btn btn-accent">Adopted</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddedPets;

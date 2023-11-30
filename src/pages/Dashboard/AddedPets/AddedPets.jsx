import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const AddedPets = () => {
  const { user } = useAuth();
  const [addedPets, setAddedPets] = useState([]);
  useEffect(() => {
    fetch(
      // `http://localhost:5000/allPets?email=${user?.email}`
      `https://pawspalace-pet-adoption-server.vercel.app/allPets?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAddedPets(data);
      });
  }, [user?.email]);
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
                    <button className="btn btn-outline">Update</button>
                    <button className="btn btn-secondary">Delete</button>
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

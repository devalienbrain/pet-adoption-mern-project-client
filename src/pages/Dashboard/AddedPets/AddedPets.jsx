import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const AddedPets = () => {
  const { user } = useAuth();
  const [addedPets, setAddedPets] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/allPets?email=${user?.email}`)
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
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {addedPets.map((addedPet, index) => (
              <tr key={addedPet._id}>
                <th>{index + 1}</th>
                <td>Ka</td>
                <td>Kha</td>
                <td>Hmm</td>
                <td>Jaa</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddedPets;

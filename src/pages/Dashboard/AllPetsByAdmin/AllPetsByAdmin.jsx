import { useEffect, useState } from "react";

const AllPetsByAdmin = () => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/allPets")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        // console.log(pets);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-evenly my-4 pt-20">
        <h2 className="text-3xl">Your Added Pets List</h2>
        <h2 className="text-3xl">Total Pets: {pets.length}</h2>
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
            {pets.map((pet, index) => (
              <tr key={pet._id}>
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

export default AllPetsByAdmin;

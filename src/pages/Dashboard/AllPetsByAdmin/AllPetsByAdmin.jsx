import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllPetsByAdmin = () => {
  const [pets, setPets] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosSecure.get("/allPets");
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="flex justify-evenly my-4 pt-20">
        <h2 className="text-3xl">All Pets List</h2>
        <h2 className="text-3xl">Total Pets: {pets.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Pet Name</th>
              <th>Pet Age</th>
              <th>Pet Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet, index) => (
              <tr key={pet._id}>
                <th>{index + 1}</th>
                <td>{pet.name}</td>
                <td>{pet.age}</td>
                <td>{pet.location}</td>
                <td>
                  <div className="flex flex-col space-y-2">
                    <button className="btn btn-outline">Edit</button>
                    <button className="btn btn-primary">Delete</button>
                    <button className="btn btn-danger">Adoption Status</button>
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

export default AllPetsByAdmin;

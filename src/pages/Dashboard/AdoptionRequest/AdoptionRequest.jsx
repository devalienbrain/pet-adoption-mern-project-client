import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyCreatedAdoptionRequest = () => {
  const { user } = useAuth();
  const [myCreatedAdoptions, setMyCreatedAdoptions] = useState([]);
  const axiosSecure = useAxiosSecure();
  const fetchData = async () => {
    const adoptionsRequest = await axiosSecure.get(
      `/allPets?email=${user?.email}`
    );
    setMyCreatedAdoptions(adoptionsRequest.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const adoptionRequested = myCreatedAdoptions.filter(
    (pet) => pet.adoptedStatus === true
  );

  return (
    <div>
      <div className="flex justify-evenly my-4 pt-20">
        <h2 className="text-3xl">Your Created Pets List (Adoption Status)</h2>
        <h2 className="text-3xl">Total Pet: {adoptionRequested.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Person Name</th>
              <th>Person Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {adoptionRequested.map((pet, index) => (
              <tr key={pet._id}>
                <th>{index + 1}</th>
                <td>{pet.reqPersonName}</td>
                <td>{pet.reqPersonEmail} </td>
                <td>{pet.reqPersonAddress}</td>
                <td>{pet.reqPersonPhone}</td>
                <td>
                  <div className="flex flex-col space-y-2">
                    <button className="btn btn-outline">Accept</button>
                    <button className="btn bg-red-600 text-white">
                      Reject
                    </button>
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

export default MyCreatedAdoptionRequest;

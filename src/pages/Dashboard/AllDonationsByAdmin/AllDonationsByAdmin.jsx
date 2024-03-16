import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllDonationsByAdmin = () => {
  const [donations, setDonations] = useState([]);

  const axiosSecure = useAxiosSecure();
  const fetchData = async () => {
    const donations = await axiosSecure.get("/donation");
    setDonations(donations.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-evenly my-4 pt-20">
        <h2 className="text-3xl">All Donation Campaigns List</h2>
        <h2 className="text-3xl">Total Campaigns: {donations.length}</h2>
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
            {donations.map((donation, index) => (
              <tr key={donation._id}>
                <th>{index + 1}</th>
                <td>{donation.campaignName}</td>
                <td>{donation.lastDate}</td>
                <td>{donation.addedByUser}</td>
                <td>
                  <div className="flex flex-col space-y-2">
                    <button className="btn btn-outline">Pause</button>
                    <button className="btn btn-secondary">Edit</button>
                    <button className="btn btn-accent">DELETE</button>
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

export default AllDonationsByAdmin;

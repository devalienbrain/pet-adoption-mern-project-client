import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyCreatedDonationCampaigns = () => {
  const { user } = useAuth();
  const [myCreatedCampaigns, setMyCreatedCampaigns] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/donation?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyCreatedCampaigns(data);
      });
  }, [user?.email]);
  return (
    <div>
      <div className="flex justify-evenly my-4 pt-20">
        <h2 className="text-3xl">Your Created Campaigns List</h2>
        <h2 className="text-3xl">
          Total Campaigns: {myCreatedCampaigns.length}
        </h2>
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
            {myCreatedCampaigns.map((Campaign, index) => (
              <tr key={Campaign._id}>
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

export default MyCreatedDonationCampaigns;

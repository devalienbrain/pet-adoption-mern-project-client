import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyCreatedDonationCampaigns = () => {
  const { user } = useAuth();
  const [myCreatedCampaigns, setMyCreatedCampaigns] = useState([]);
  const axiosSecure = useAxiosSecure();
  const fetchData = async () => {
    const campaigns = await axiosSecure.get(`/donation?email=${user?.email}`);
    setMyCreatedCampaigns(campaigns.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
              <th>Serial</th>
              <th>Pet Name</th>
              <th>Maximum Donatio Amount</th>
              <th>Donation Progress Bar</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myCreatedCampaigns.map((campaign, index) => (
              <tr key={campaign._id}>
                <th>{index + 1}</th>
                <td>{campaign.petName}</td>
                <td>{campaign.maxAmount} $ </td>
                <td>Hmm</td>
                <td>
                  <div className="flex flex-col space-y-2">
                    <button className="btn btn-outline">Pause</button>
                    <button className="btn btn-secondary">Edit</button>
                    <button className="btn btn-accent">View Donators</button>
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

export default MyCreatedDonationCampaigns;

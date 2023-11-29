import { useEffect, useState } from "react";
import AllDonationCampaignsDisplayCard from "./AllDonationCampaignsDisplayCard";

const DonationCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/donation")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        // console.log(campaigns);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center p-10">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-pink-500 via-red-500 to-red-900 bg-clip-text text-transparent text-center font-black uppercase py-10">
            ALL CAMPAIGNS LIST
          </h1>
          <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.map((aDonationCampaign) => (
                <AllDonationCampaignsDisplayCard
                  key={aDonationCampaign._id}
                  aDonationCampaign={aDonationCampaign}
                ></AllDonationCampaignsDisplayCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCampaigns;

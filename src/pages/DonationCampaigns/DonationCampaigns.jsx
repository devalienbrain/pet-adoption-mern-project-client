import { useEffect, useState } from "react";
import AllDonationCampaignsDisplayCard from "./AllDonationCampaignsDisplayCard";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DonationCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosSecure.get("/donation");
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetch();
  }, [axiosSecure]);

  // Sort campaigns by date in descending order
  const sortedCampaigns = campaigns.slice().sort((a, b) => {
    return new Date(b.lastDate) - new Date(a.lastDate);
  });

  return (
    <div>
      <Helmet>
        <title>PawsPalace Pet Place | Donations</title>
      </Helmet>
      <div className="flex justify-center items-center p-10">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-pink-500 via-blue-700 to-red-900 bg-clip-text text-transparent text-center font-black uppercase pt-10">
            DONATION CAMPAIGNS
          </h1>
          <p className="text-center pb-10">
            sorted by last date in descending order
          </p>
          <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedCampaigns.map((aDonationCampaign) => (
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

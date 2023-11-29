import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FcAddDatabase } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateDonation = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user.email);
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the pet item data to the server with the image url
      const donationDetails = {
        campaignName: data.name,
        maxAmount: parseInt(data.amount),
        lastDate: data.date,
        shortDescription: data.short,
        longDescription: data.long,
        image: res.data.data.display_url,
        addedByUser: user.email,
      };
      //
      const donationRes = await axiosSecure.post("/donation", donationDetails);
      console.log(donationRes.data);
      if (donationRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `A new Campaign ${data.name} is created.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log("with image url", res.data);
  };

  return (
    <div>
      <div>
        <h1 className="text-xl md:text-3xl font-black bg-gradient-to-r from-red-700 via-blue-600 to-purple-900 bg-clip-text text-transparent py-10">
          CREATE A DONATION CAMPAIGN
        </h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Maximum Donation Amount*</span>
              </label>
              <input
                type="number"
                placeholder="enter amount"
                {...register("amount", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Donation Campaign Name*</span>
              </label>
              <input
                type="text"
                placeholder="enter campaign name"
                {...register("name", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="flex gap-6">
            {/* location */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Last Date of Donation*</span>
              </label>
              <input
                type="date"
                placeholder="enter date"
                {...register("date", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Short Description*</span>
            </label>
            <input
              type="text"
              placeholder="pet dscription"
              {...register("short", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          {/* pet details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pet Details (Long Description)</span>
            </label>
            <textarea
              {...register("long")}
              className="textarea textarea-bordered h-24"
              placeholder="details"
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Please upload pet image</span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn">
            Create Donation <FcAddDatabase className="ml-4"></FcAddDatabase>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonation;

import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FcAddDatabase } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddAPet = () => {
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
      const petDetails = {
        name: data.name,
        category: data.category,
        age: parseInt(data.age),
        location: data.location,
        shortDescription: data.short,
        longDescription: data.long,
        image: res.data.data.display_url,
        addedByUser: user.email,
      };
      //
      const petRes = await axiosSecure.post("/addedPets", petDetails);
      console.log(petRes.data);
      if (petRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the pet list.`,
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
        <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-red-700 via-blue-600 to-purple-900 bg-clip-text text-transparent py-10">
          ADD A PET
        </h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Pet Name*</span>
              </label>
              <input
                type="text"
                placeholder="pet name"
                {...register("name", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="birds">Birds</option>
                <option value="cats">Cats</option>
                <option value="dogs">Dogs</option>
                <option value="fishes">Fishes</option>
                <option value="rabbits">Rabbits</option>
                <option value="turtles">Turtles</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Pet Age*</span>
              </label>
              <input
                type="number"
                placeholder="age"
                {...register("age", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            {/* location */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Pet Location*</span>
              </label>
              <input
                type="text"
                placeholder="pet location"
                {...register("location", { required: true })}
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
            Add the Pet <FcAddDatabase className="ml-4"></FcAddDatabase>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAPet;

import { Link } from "react-router-dom";

const AllPetsDisplayCard = ({ singlePet }) => {
  const { _id, name, category, age, location, image } = singlePet;
  return (
    <div className="card">
      <figure className="p-3">
        <img className="w-72 h-72 object-contain" src={image} alt="Pet" />
      </figure>
      <h2 className="card-title mx-auto p-3 bg-gradient-to-r from-blue-500 to-red-900 bg-clip-text text-transparent">
        Pet Name: {name}
      </h2>
      <div className="card-body text-center">
        <p>
          Age: <span className="font-bold">{age}</span>{" "}
        </p>
        <p>
          Pet Location: <span className="font-bold">{location}</span>{" "}
        </p>
        <p className="font-bold bg-gradient-to-r from-pink-500 via-red-500 to-red-900 bg-clip-text text-transparent">
          Category: {category}
        </p>
        <p>Pet Location = {location}</p>

        <div className="card-actions justify-center">
          <Link to={`/details/${_id}`}>
            <button className="py-2 px-5 text-white  rounded-md bg-blue-600 hover:bg-blue-700">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllPetsDisplayCard;

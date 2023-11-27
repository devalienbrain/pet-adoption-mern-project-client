import { Link } from "react-router-dom";

const AllPetsDisplayCard = ({ singlePet }) => {
  const { _id, name, category, age, location } = singlePet;
  return (
    <div className="card w-96 bg-base-100 border border-blue-100">
      <h2 className="card-title mx-auto p-3 bg-gradient-to-r from-blue-500 to-red-900 bg-clip-text text-transparent">
        {name}
      </h2>
      {/* <figure>
        <img src={image} alt="Book" />
      </figure> */}
      <div className="card-body text-center">
        <p>
          Age: <span className="font-bold">{age}</span>{" "}
        </p>
        <p className="font-bold bg-gradient-to-r from-pink-500 via-red-500 to-red-900 bg-clip-text text-transparent">
          {category}
        </p>
        <p>Pet Location = {location}</p>

        <div className="card-actions justify-center">
          <Link to={`/details/${_id}`}>
            <button className="py-3 px-7 text-white font-semibold rounded-xl bg-blue-600 hover:bg-blue-700">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllPetsDisplayCard;

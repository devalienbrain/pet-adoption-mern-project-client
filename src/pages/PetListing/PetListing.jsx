import { useEffect, useState } from "react";
import AllPetsDisplayCard from "./AllPetsDisplayCard";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("default");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/AllPets");

        const petsAllData = response.data;
        const petsData = petsAllData.filter((pet) => !pet.adoptedStatus);
        setPets(petsData);
        applyFilters(petsData);
      } catch (error) {
        console.error("Error fetching pets data:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  const applyFilters = (petsData) => {
    let filteredResult = petsData.filter(
      (pet) =>
        (!searchTerm ||
          pet.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "default" || pet.category === selectedCategory)
    );
    setFilteredPets(filteredResult);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    applyFilters(pets);
  }, [pets, searchTerm, selectedCategory]);

  return (
    <div>
      <Helmet>
        <title>PawsPalace Pet Place | Pet List</title>
      </Helmet>
      <div className="flex justify-center items-center p-10">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-pink-500 via-red-500 to-red-900 bg-clip-text text-transparent text-center font-black uppercase py-10">
            FIND PETS THATS ARE NOT ADOPTED YET
          </h1>
          <div className="py-10">
            <div className="flex justify-center py-4 gap-4">
              <input
                className="p-3 rounded-xl bg-blue-50"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by name"
              />
              <button
                className="py-3 px-7 rounded-xl bg-blue-950 text-white"
                onClick={() => applyFilters(pets)}
              >
                Search
              </button>
            </div>

            <select
              id="category"
              name="category"
              className="input input-bordered rounded-xl drop-shadow-lg w-full px-5"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="default">Select a category</option>
              <option value="birds">Birds</option>
              <option value="cats">Cats</option>
              <option value="dogs">Dogs</option>
              <option value="fishes">Fishes</option>
              <option value="rabbits">Rabbits</option>
              <option value="turtles">Turtles</option>
              <option value="others">Others</option>
            </select>

            <p className="py-7 text-center text-red-900 font-semibold">
              Total = {filteredPets.length}
            </p>
          </div>

          <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredPets.map((singlePet) => (
                <AllPetsDisplayCard
                  key={singlePet._id}
                  singlePet={singlePet}
                ></AllPetsDisplayCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPets;

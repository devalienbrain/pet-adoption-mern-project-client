import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null); // Add state for error handling
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("petCategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("An error occurred while fetching categories.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-center my-20">
      <h1 className="my-5 text-4xl md:text-6xl font-black">PET CATEGORIES</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="py-9 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-10">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Categories;

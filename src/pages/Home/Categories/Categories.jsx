import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/petCategories")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCategories(data);
      });
  }, []);

  return (
    <div className="text-center my-20">
      <h1 className="my-5 text-xl md:text-3xl bg-gradient-to-r from-blue-700 via-purple-700 to-blue-600  bg-clip-text text-transparent font-bold">
        BROWSE PET BY CATEGORIES
      </h1>
      <div className="py-9 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-10">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Categories;

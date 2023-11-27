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
      <h3 className="text-3xl md:text-4xl font-semibold pt-5">
        PET CATEGORIES
      </h3>
      <div className="py-9 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-10">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Categories;

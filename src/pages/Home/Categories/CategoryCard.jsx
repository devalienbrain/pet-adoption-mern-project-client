const CategoryCard = ({ category }) => {
  // console.log(category);

  const { name, image } = category || {};

  return (
    <div className="rounded-lg flex flex-col justify-center items-center gap-1 p-5 hover:bg-red-50 py-7">
      <img className="w-20" src={image} alt="Alternative Image" />
      <div className="p-4 text-center">
        <h3 className="text-2xl text-center font-bold hover:underline">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;

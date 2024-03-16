const CategoryCard = ({ category }) => {
  // console.log(category);

  const { name, image } = category || {};

  return (
    <div className="rounded-lg flex flex-col justify-center items-center gap-1 p-5 py-7">
      <img
        className="w-32 p-5 rounded-md shadow-xl"
        src={image}
        alt="Alternative Image"
      />
      <div className="p-4 text-center">
        <h3 className="uppercase text-xl md:text-2xl text-center font-bold">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;

const CategoryCard = ({ category }) => {
  // console.log(category);

  const { name, image } = category || {};

  return (
    <div className="rounded-lg flex flex-col justify-center items-center gap-1 p-5 py-7">
      <img className="w-20" src={image} alt="Alternative Image" />
      <div className="p-4 text-center">
        <h3 className="text-2xl text-center font-bold bg-gradient-to-r from-blue-800 via-purple-600 to-red-600 bg-clip-text text-transparent hover:bg-gradient-to-br">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;

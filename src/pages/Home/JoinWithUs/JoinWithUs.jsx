import blackImg from "../../../../public/Resources/black.png";
const JoinWithUs = () => {
  return (
    <div className="my-10 relative flex justify-center items-center mx-auto lg:p-20">
      <div
        className="w-full"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/cLCJFR2/isolated-shot-retriever-dog-ginger-cat-front-white-surface-looking-right.png)",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <img src={blackImg} className="opacity-25 w-full" />
      </div>
      <div className="absolute top-1/2 right-1/3 text-2xl font-semibold md:font-black p-2">
        BECOME A HUMAN HERO
        <p>join our community || donate and adopt</p>
      </div>
    </div>
  );
};

export default JoinWithUs;

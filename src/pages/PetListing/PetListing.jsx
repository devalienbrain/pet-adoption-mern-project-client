// import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router-dom";

// import Swal from "sweetalert2";
// import AllPetsDisplayCard from "./AllPetsDisplayCard";

// const AllPets = () => {
//   const countPets = useLoaderData();
//   const { count } = countPets;
//   const totalItems = count;
//   const [itemsPerPage, setItemsPerPage] = useState(48);
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   // console.log(count, totalItems, itemsPerPage);
//   const pages = [...Array(totalPages).keys()];
//   // console.log(pages);

//   const handleItemsPerPage = (e) => {
//     console.log(e.target.value);
//     const val = parseInt(e.target.value);
//     setItemsPerPage(val);
//   };
//   const [currentPage, setCurrenPage] = useState(0);
//   // console.log(currentPage);

//   const handleGoPrevPage = () => {
//     if (currentPage > 0) {
//       setCurrenPage(currentPage - 1);
//     }
//   };
//   const handleGoNextPage = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrenPage(currentPage + 1);
//     }
//   };
//   const [pets, setPets] = useState([]);
//   useEffect(() => {
//     fetch(
//       `http://localhost:5000/allPets?page=${currentPage}&size=${itemsPerPage}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setPets(data);
//         // console.log(pets);
//       });
//   }, [currentPage, itemsPerPage]);

//   return (
//     <div>
//       <div className="flex justify-center items-center p-10">
//         <div>
//           <div className="text-3xl bg-gradient-to-r from-pink-500 via-red-500 to-red-900 bg-clip-text text-transparent text-center font-black uppercase">
//             LIST OF ALL PETS
//           </div>

//           <div className="p-5 my-5 border rounded-xl  font-semibold text-xs">
//             <label htmlFor="itemsPerPage">Showing pets per page = </label>
//             <select
//               name="itemsPerPage"
//               id="itemsPerPage"
//               onChange={handleItemsPerPage}
//             >
//               <option value="12">12</option>
//               <option value="24">24</option>
//               <option value="48">48</option>
//             </select>
//           </div>
//           {/* LOAD AND SHOW BOOKS SECTION STARTS */}
//           <div className="min-h-screen">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {pets.map((singlePet) => (
//                 <AllPetsDisplayCard
//                   key={singlePet._id}
//                   singlePet={singlePet}
//                 ></AllPetsDisplayCard>
//               ))}
//             </div>
//           </div>
//           {/* LOAD AND SHOW BOOKS SECTION ENDS  */}
//           <div className="flex justify-center gap-3 py-10">
//             <button onClick={handleGoPrevPage}>Prev</button>
//             {pages.map((page) => {
//               // console.log(page);
//               return (
//                 <button
//                   className={currentPage === page ? "text-red-600" : ""}
//                   onClick={() => setCurrenPage(page)}
//                   key={page}
//                 >
//                   {page}
//                 </button>
//               );
//             })}
//             <button onClick={handleGoNextPage}>Next</button>
//             {/* <p>Current: {currentPage}</p> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllPets;

import { useEffect, useState } from "react";
import AllPetsDisplayCard from "./AllPetsDisplayCard";

const AllPets = () => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/allPets")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        // console.log(pets);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center p-10">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-pink-500 via-red-500 to-red-900 bg-clip-text text-transparent text-center font-black uppercase py-10">
            LIST OF ALL PETS
          </h1>

          {/* LOAD AND SHOW BOOKS SECTION STARTS */}
          <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {pets.map((singlePet) => (
                <AllPetsDisplayCard
                  key={singlePet._id}
                  singlePet={singlePet}
                ></AllPetsDisplayCard>
              ))}
            </div>
          </div>
          {/* LOAD AND SHOW BOOKS SECTION ENDS  */}
        </div>
      </div>
    </div>
  );
};

export default AllPets;

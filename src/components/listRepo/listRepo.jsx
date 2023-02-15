import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

function listRepo({ title, description, star, urlRepo }) {
   const [shownRepo, setShownRepo] = useState(false);
   const openRepo = () => {
      window.open(urlRepo);
   };
   const show = () => {
      setShownRepo(!shownRepo);
   };
   return (
      <section
         className={`shadow-lg bg-slate-400/80 rounded-sm my-2 w-[98%] break-all  transition-all duration-300 hover:ring-2 hover:ring-red-400 `}
         onClick={openRepo}
      >
         <div className="flex w-full px-2 justify-start lg:justify-between">
            <div className="w-full p-2 lg:w-3/4">
               <h3 className="text-base lg:text-lg font-bold">{title}</h3>
               <p className="text-black text-base">{description}</p>
            </div>
            <div className="flex md:w-30 w-36 items-start p-2 justify-end ">
               <div className="flex justify-end items-center flex-1">
                  <span className="text-lg font-bold text-slate-600 mr-2 ">
                     {star}
                  </span>
                  <StarIcon className="text-black w-5 h-5" />
               </div>
            </div>
         </div>
      </section>
   );
}

export default listRepo;

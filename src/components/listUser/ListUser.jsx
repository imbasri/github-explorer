import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ListRepo from "../listRepo/listRepo";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
function ListUser({ name, src, repo }) {
   const [showList, setShowList] = useState(false);
   const [data, setData] = useState([]);
   const [repos, setRepos] = useState([]);
   const show = () => {
      // console.log(showList);
      if (showList) {
         return setShowList(false);
      }
      axios
         .get(repo)
         .then((res) => {
            // console.log("data : ", res.data);
            // console.log("debug : ", res.data[0].owner.repos_url);
            setData(res.data);
            setRepos(res.data[0].owner.repos_url);
            setShowList(true);
            toast.warn(res.data.length < 0);
         })
         .catch((err) => {
            console.log(err);
            toast.warn("data repository not found");
         });
   };

   return (
      <section className="shadow-sm bg-white w-full mx-auto px-5 my-2 cursor-pointer break-all">
         <div
            className="flex bg-slate-200 rounded-lg justify-between w-full mx-auto p-5 items-center"
            onClick={show}
         >
            <div className="flex items-center flex-1">
               <img
                  src={src}
                  alt={name}
                  className="w-16 h-16 bg-red-200 mr-2 rounded-full"
               />
               <span className="text-base w-[70%] mx-1 md:w-full text-slate-600 font-bold block">
                  {name}
               </span>
            </div>
            <div
               className={`${
                  showList && repos === repo && data ? "rotate-0" : "rotate-180"
               }`}
            >
               <ChevronDownIcon className="w-6 h-6" />
            </div>
         </div>
         {/* listRepo */}
         {showList && repos === repo && data ? (
            <div className={`w-full flex justify-center items-start `}>
               <div className="flex w-full justify-center flex-col items-center">
                  {showList &&
                     repos === repo &&
                     data &&
                     data.map((repo) => {
                        return (
                           <ListRepo
                              key={repo.id}
                              title={repo.name}
                              description={
                                 repo.description === null
                                    ? "no description"
                                    : repo.description
                              }
                              star={repo.stargazers_count}
                              urlRepo={repo.html_url}
                           />
                        );
                     })}
               </div>
            </div>
         ) : null}
         <ToastContainer />
      </section>
   );
}

export default ListUser;

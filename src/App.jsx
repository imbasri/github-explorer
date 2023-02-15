import axios from "axios";
import React, { useState } from "react";
import ListUser from "./components/listUser/ListUser";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./components/loading/loading";
import { useNavigate } from "react-router-dom";
function App() {
   document.title = "Github Explorer";
   const baseUrl = import.meta.env.VITE_API;
   const [user, setUser] = useState("");
   const [userShow, setUserShow] = useState("");
   const [show, setShow] = useState(false);
   const [data, setData] = useState([]);
   const [page, setPage] = useState(1);
   const [totalPage, setTotalPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const handleSubmit = (e) => {
      e.preventDefault();
      setUserShow(user);
      setShow(true);
      setLoading(false);
      if (user.length > 0) {
         axios
            .get(`${baseUrl}/search/users?q=${user}&per_page=5&page=${page}`)
            .then((res) => {
               // console.log(res.data.items);
               // console.log(res.data);
               setTotalPage(
                  res.data.total_count > 5
                     ? Math.floor(res.data.total_count / 5)
                     : 1
               );
               navigate(`/search/users?q=${user}&per_page=5&page=${page}`);
               setData(res.data.items);
               setPage(1);
               setLoading(true);
            })
            .catch((err) => {
               console.log(err);
               toast.error(err.response.data.message);
            });
      } else {
         return toast.error("please enter the data correctly!");
      }
      setLoading(false);
   };
   const next = (e) => {
      e.preventDefault();
      setUserShow(user);
      setShow(true);
      setLoading(false);

      if (user.length > 0) {
         navigate(`/search/users?q=${user}&per_page=5&page=${page + 1}`);
         axios
            .get(
               `${baseUrl}/search/users?q=${user}&per_page=5&page=${page + 1}`
            )
            .then((res) => {
               // console.log(res.data.items);
               // console.log(res.data);
               setData(res.data.items);
               setPage(page + 1);
               setLoading(true);
            })
            .catch((err) => {
               console.log(err);
               toast.error(err.response.data.message);
            });
      }
      setLoading(false);
   };
   const prev = (e) => {
      e.preventDefault();
      setUserShow(user);
      setShow(true);
      setLoading(false);

      if (user !== 0) {
         navigate(`/search/users?q=${user}&per_page=5&page=${page - 1}`);
         axios
            .get(
               `${baseUrl}/search/users?q=${user}&per_page=5&page=${page - 1}`
            )
            .then((res) => {
               // console.log(res.data.items);
               // console.log(res.data);
               setData(res.data.items);
               setPage(page - 1);
               setLoading(true);
            })
            .catch((err) => {
               console.log(err);
               toast.error(err.response.data.message);
            });
      }
      setLoading(false);
   };

   return (
      <main className="font-sans max-w-[1440px] mx-auto md:bg-slate-100 md:px-10  h-screen break-all ">
         <section className="container m-auto py-5">
            <div className="flex flex-col justify-start items-center shadow-sm md:shadow-md pt-5 w-full bg-white h-[92vh] ">
               <form action="GET" className=" my-1 w-full p-5 ">
                  <input
                     type="text"
                     name="username"
                     id="username"
                     placeholder="Enter username"
                     onChange={(e) => {
                        setUser(e.target.value);
                     }}
                     className="w-full py-2 pl-3 mb-5 rounded-sm text-lg bg-slate-200 placeholder:text-slate-500 focus:outline-sky-400 hover:ring-1 selection:bg-yellow-300/90 selection:text-black"
                  />
                  <button
                     onClick={handleSubmit}
                     type="submit"
                     className="text-md w-full text-white text-lg bg-sky-500 py-2 rounded-md hover:bg-sky-600 hover:ring-1 transition-all duration-300 active:scale-[.98] shadow-sm"
                  >
                     Search
                  </button>
               </form>
               {/* showing users */}
               {show ? (
                  <span className="self-start text-start text-md text-slate-500 font-bold px-6 mb-1">{`Showing users for "${userShow}"`}</span>
               ) : null}
               {/* List */}
               {show && data.length === 0 ? (
                  <div className="text-4xl flex justify-center items-center w-full h-screen">
                     <h1 className="font-bold font-serif animate-pulse">
                        Data not found 😿
                     </h1>
                  </div>
               ) : show ? (
                  <div className="w-full overflow-y-scroll h-screen min-h-auto">
                     {loading ? (
                        data &&
                        data.map((list, index) => {
                           return (
                              <ListUser
                                 key={index}
                                 name={list.login}
                                 src={list.avatar_url}
                                 repo={list.repos_url}
                              />
                           );
                        })
                     ) : (
                        <div className="flex justify-center items-center w-full h-96">
                           <Loading />
                        </div>
                     )}
                  </div>
               ) : null}
               {data.length === 0 ? null : (
                  <div className="flex lg:justify-center mt-3 justify-between w-full md:px-20 px-10 py-3 mb-1">
                     <button
                        className={`btn-simple ${
                           page === 1 ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                        onClick={prev}
                        disabled={page === 1}
                     >
                        Prev
                     </button>
                     <div className="flex justify-center items-center">
                        <span className="text-base font-medium">{` ${page} / ${totalPage}`}</span>
                     </div>
                     <button
                        className={`btn-simple ${
                           page === totalPage
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                        }`}
                        onClick={next}
                        disabled={page === totalPage}
                     >
                        Next
                     </button>
                  </div>
               )}
            </div>
            <ToastContainer />
         </section>
         <footer className="text-xs text-center p-2">
            created by imbasri in @2023
         </footer>
      </main>
   );
}

export default App;

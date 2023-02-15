import React from "react";
import error from "../../assets/img/error.jpg";
function Error() {
   return (
      <div className="w-full h-screen max-w-[1440px] mx-auto ">
         <div className="flex justify-center items-center h-screen flex-col animate-pulse ">
            <img src={error} alt="Error" className="w-1/2 rounded-full" />
            <p className="text-4xl py-5">
               Page Not Found - <span className="text-red-500">404</span>
            </p>
         </div>
      </div>
   );
}

export default Error;

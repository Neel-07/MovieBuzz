import React from "react";
import { Link } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'

const SideNav = () => {
  return (
    <div className="w-[20%] h-full  border-r-2 border-zinc-400 p-3">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill "></i>
        <span className=""> MovieBuzz </span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl p-5 mt-10 mb-2">
          New Feeds
        </h1>
        <Link className="hover:bg-[#6556CD] p-5 hover:text-white rounded-lg duration-300"><i class="ri-fire-fill"></i>
        Trending</Link>
        <Link className="hover:bg-[#6556CD] p-5 hover:text-white rounded-lg duration-300 ">
        <i class="ri-bard-fill mr-1"></i>Popular</Link>
        <Link className="hover:bg-[#6556CD] p-5 hover:text-white rounded-lg duration-300">
        <i class="ri-movie-2-fill mr-1"></i>Movies</Link>
        <Link className="hover:bg-[#6556CD] p-5 hover:text-white rounded-lg duration-300">
        <i class="ri-tv-2-fill mr-1"></i>TV shows</Link>
        <Link className="hover:bg-[#6556CD] p-5 hover:text-white rounded-lg duration-300"><i class="ri-team-fill mr-1"></i>People</Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400"/>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl p-5 mt-10 mb-2">
          Website Information
        </h1>
        <Link className="hover:bg-[#6556CD] p-5 hover:text-white rounded-lg duration-300"><i class="ri-information-fill mr-1"></i>
        About</Link>
        <Link className="hover:bg-[#6556CD] p-5 hover:text-white rounded-lg duration-300 ">
        <i class="ri-phone-fill mr-1"></i>Contact Us</Link>
      </nav>
    </div>
  );
};

export default SideNav;

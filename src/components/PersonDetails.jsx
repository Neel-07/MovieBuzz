import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "./templates/HorizontalCards";
import Loading from "./Loading";
import Dropdown from "./templates/Dropdown";

const PersonDetails = () => {
    document.title = "MovieBuzz | Person Details";

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { info } = useSelector((state) => state.person);
    const dispatch = useDispatch();
    const [category, setcategory] = useState("movie");

    useEffect(() => {
        dispatch(asyncloadperson(id)); // Make sure this action aligns with OMDB data structure
        return () => {
            dispatch(removeperson());
        };
    }, [id]);

    // Update based on OMDB data structure
    const personData = info ? info.detail : null;

    return personData ? (
        <div className="px-[10%] w-screen h-[150vh] bg-[#1F1E24] ">
            {/* Part 1 navigation */}
            <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl ">
                <Link
                    onClick={() => navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line"
                ></Link>
            </nav>

            <div className="w-full flex ">
                {/* Part 2 left Poster and Details */}
                <div className="w-[20%] ">
                    <img
                        className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover"
                        src={`https://image.tmdb.org/t/p/original/${personData.Poster}`} // OMDB does not provide a person poster, use an appropriate image source or placeholder
                        alt="Person"
                    />
                    <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
                    {/* Social Media Links */}
                    {/* OMDB does not provide social media links */}
                    {/* Placeholder for social media links */}
                </div>

                {/* Part 3 right Details and Information */}
                <div className="w-[80%] ml-[5%]">
                    <h1 className="text-6xl text-zinc-400 font-black my-5">
                        {personData.Name}
                    </h1>

                    <h1 className="text-xl text-zinc-400 font-semibold ">
                        Biography
                    </h1>
                    <p className="text-zinc-400 mt-3 ">
                        {personData.Biography || "No biography available"}
                    </p>

                    <h1 className="mt-5 text-lg text-zinc-400 font-semibold ">
                        Known For
                    </h1>
                    {/* Replace with OMDB credits or a similar feature */}
                    <HorizontalCards data={personData.KnownFor || []} />

                    <div className="w-full flex justify-between">
                        <h1 className="mt-5 text-xl text-zinc-400 font-semibold ">
                            Acting
                        </h1>

                        <Dropdown
                            title="Category"
                            options={["movie", "tv"]}
                            func={(e) => setcategory(e.target.value)}
                        />
                    </div>

                    <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5">
                        {personData[category + "Credits"]?.map((c, i) => (
                            <li
                                key={i}
                                className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
                            >
                                <Link
                                    to={`/${category}/details/${c.id}`}
                                    className=""
                                >
                                    <span>
                                        {c.Title || c.Name || c.original_name}
                                    </span>

                                    <span className="block ml-5 mt-2">
                                        {c.Character && `Character Name: ${c.Character}`}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default PersonDetails;

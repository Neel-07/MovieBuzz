import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const Topnav = () => {
    const [query, setquery] = useState("");
    const [searches, setsearches] = useState([]);

    // Updated function to use the correct OMDb API endpoint
    const GetSerches = async () => {
        try {
            // Ensure you use the correct endpoint and parameters
            const { data } = await axios.get('', {
                params: {
                    s: query, // Search query
                },
            });
            // Check if the response has Search results
            if (data.Response === "True") {
                setsearches(data.Search); // Update with the correct key for search results
            } else {
                setsearches([]); // Clear search results if no matches
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        if (query.length > 0) {
            GetSerches();
        } else {
            setsearches([]); // Clear search results if query is empty
        }
    }, [query]);

    return (
        <div className="w-[80%] h-[10vh] relative flex mx-auto items-center">
            <i className="text-zinc-400 text-3xl ri-search-line"></i>
            <input
                onChange={(e) => setquery(e.target.value)}
                value={query}
                className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
                type="text"
                placeholder="search anything"
            />
            {query.length > 0 && (
                <i
                    onClick={() => setquery("")}
                    className="text-zinc-400 text-3xl ri-close-fill right-0"
                ></i>
            )}

            <div className="z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto">
                {searches.map((s, i) => (
                    <Link
                        to={`/${s.Type}/details/${s.imdbID}`} // Use `imdbID` for linking
                        key={i}
                        className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100"
                    >
                        <img
                            className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
                            src={
                                s.Poster !== "N/A"
                                    ? s.Poster
                                    : noimage
                            }
                            alt={s.Title || s.Name || s.OriginalTitle || "No Image"}
                        />
                        <span>
                            {s.Title || s.Name || s.OriginalTitle}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Topnav;

import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const HorizontalCards = ({ data }) => {
    return (
        <div className="w-[100%] flex overflow-y-hidden mb-5 p-5 ">
            {data.length > 0 ? (
                data.map((d, i) => (
                    <Link
                        to={`/details/${d.imdbID}`} // Use imdbID for the link
                        key={i}
                        className="min-w-[15%] h-[35vh] bg-zinc-900 mr-5 mb-5"
                    >
                        <img
                            className="w-full h-[55%] object-cover"
                            src={d.Poster !== "N/A" ? d.Poster : noimage} // OMDB uses "Poster" field
                            alt={d.Title}
                        />
                        <div className="text-white p-3 h-[45%] overflow-y-auto">
                            <h1 className="text-xl font-semibold">
                                {d.Title} {/* OMDB uses "Title" */}
                            </h1>
                            <p className="text-zinc-400">
                                {d.Year} {/* OMDB uses "Year" */}
                            </p>
                            <p>
                                {d.Type.charAt(0).toUpperCase() + d.Type.slice(1)} {/* Capitalize "Type" */}
                            </p>
                        </div>
                    </Link>
                ))
            ) : (
                <h1 className="text-3xl mt-5 text-white font-black text-center">
                    Nothing to show
                </h1>
            )}
        </div>
    );
};

export default HorizontalCards;

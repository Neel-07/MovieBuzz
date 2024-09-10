import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
    return (
        <div
            style={{
                background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url(${data.Poster})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className="w-full h-[50vh] flex flex-col justify-end items-start p-[5%]"
        >
            <h1 className="w-[70%] text-5xl font-black text-white">
                {data.Title}
            </h1>
            <p className="w-[70%] mt-3 mb-3 text-white">
                {data.Plot ? `${data.Plot.slice(0, 200)}...` : "No Plot Available"}
                {data.imdbID && (
                    <Link
                        to={`/movie/details/${data.imdbID}`}
                        className="text-blue-400"
                    >
                        more
                    </Link>
                )}
            </p>
            <p className="text-white">
                <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
                {data.Released || "No Information"}
                <i className="ml-5 text-yellow-500 ri-album-fill"></i>{" "}
                {data.Type ? data.Type.toUpperCase() : "UNKNOWN"}
            </p>
            {data.imdbID && (
                <Link
                    to={`/movie/details/${data.imdbID}/trailer`}
                    className="mt-5 bg-[#6556CD] p-4 rounded text-white"
                >
                    Watch Trailer
                </Link>
            )}
        </div>
    );
};

export default Header;

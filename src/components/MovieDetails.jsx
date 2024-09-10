import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "./templates/HorizontalCards"; // Updated import
import Loading from "./Loading";

const Moviedetails = () => {
    document.title = "MovieBuzz | Movie Details";

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { info } = useSelector((state) => state.movie);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncloadmovie(id));
        return () => {
            dispatch(removemovie());
        };
    }, [id, dispatch]);

    // Ensure info contains data from OMDB API
    return info ? (
        <div
            style={{
                background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url(${info.Poster})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className="relative w-screen h-[140vh] px-[10%]"
        >
            {/* Part 1 navigation */}
            <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
                <Link
                    onClick={() => navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line"
                ></Link>
                <a target="_blank" rel="noopener noreferrer" href={info.Website}>
                    <i className="ri-external-link-fill"></i>
                </a>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.imdb.com/title/${info.imdbID}/`}
                >
                    imdb
                </a>
            </nav>

            {/* Part 2 Poster and details */}
            <div className="w-full flex">
                <img
                    className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover"
                    src={info.Poster}
                    alt={info.Title}
                />

                <div className="content ml-[5%] text-white">
                    <h1 className="text-5xl font-black">
                        {info.Title}
                        <small className="text-2xl font-bold text-zinc-200">
                            ({info.Year})
                        </small>
                    </h1>

                    <div className="mt-3 mb-5 flex items-center gap-x-3">
                        <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
                            {info.imdbRating} <sup>/10</sup>
                        </span>
                        <h1 className="w-[60px] font-semibold text-2xl leading-6">
                            User Score
                        </h1>
                        <h1>{info.Released}</h1>
                        <h1>{info.Genre}</h1>
                        <h1>{info.Runtime}</h1>
                    </div>

                    <h1 className="text-xl font-semibold italic text-zinc-200">
                        {info.Tagline}
                    </h1>

                    <h1 className="text-2xl mb-3 mt-5">Overview</h1>
                    <p>{info.Plot}</p>

                    <h1 className="text-2xl mb-3 mt-5">Movie Translated</h1>
                    <p className="mb-10">{info.Language}</p>

                    <Link
                        className="p-5 bg-[#6556CD] rounded-lg"
                        to={`${pathname}/trailer`}
                    >
                        <i className="text-xl ri-play-fill mr-3 "></i>
                        Play Trailer
                    </Link>
                </div>
            </div>

            {/* Part 3 Available on Platforms */}
            {/* OMDB API does not provide watch providers information */}
            
            {/* Part 4 Recommendations and Similar Stuff */}
            <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
            <h1 className="text-3xl font-bold text-white">
                Recommendations & Similar Stuff
            </h1>
            <HorizontalCards
                title="movie"
                data={info.recommendations || info.similar} // Adapt based on actual data
            />
            <Outlet />
        </div>
    ) : (
        <Loading />
    );
};

export default Moviedetails;

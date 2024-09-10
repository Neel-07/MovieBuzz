import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import noimage from "/noimage.jpeg";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "./templates/HorizontalCards";
import Loading from "./Loading";

const TvDetails = () => {
    document.title = "MovieBuzz | TV Show Details";
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { info } = useSelector((state) => state.tv);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncloadtv(id));
        return () => {
            dispatch(removetv());
        };
    }, [id, dispatch]);

    return info ? (
        <div className="relative w-screen h-[180vh] px-[10%] bg-gray-900 text-white">
            {/* Part 1 navigation */}
            <nav className="h-[10vh] w-full flex items-center gap-10 text-xl">
                <Link
                    onClick={() => navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line"
                ></Link>
                <a target="_blank" href={info.Website || '#'}>
                    <i className="ri-external-link-fill"></i>
                </a>
                <a
                    target="_blank"
                    href={`https://www.imdb.com/title/${info.imdbID}/`}
                >
                    IMDb
                </a>
            </nav>

            {/* Part 2 Poster and details */}
            <div className="w-full flex">
                <img
                    className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover"
                    src={info.Poster !== "N/A" ? info.Poster : noimage}
                    alt={info.Title}
                />
                <div className="content ml-[5%]">
                    <h1 className="text-5xl font-black">
                        {info.Title}
                        <small className="text-2xl font-bold text-gray-300">
                            ({info.Year})
                        </small>
                    </h1>

                    <div className="mt-3 mb-5 flex items-center gap-x-3">
                        <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
                            {info.imdbRating} <sup>%</sup>
                        </span>
                        <h1 className="w-[60px] font-semibold text-2xl leading-6">
                            User Score
                        </h1>
                        <h1>{info.Released}</h1>
                        <h1>{info.Genre}</h1>
                        <h1>{info.Runtime}</h1>
                    </div>

                    <h1 className="text-xl font-semibold italic text-gray-300">
                        {info.Tagline || 'No Tagline'}
                    </h1>

                    <h1 className="text-2xl mb-3 mt-5">Overview</h1>
                    <p>{info.Plot}</p>

                    <h1 className="text-2xl mb-3 mt-5">Languages</h1>
                    <p className="mb-10">{info.Language}</p>

                    <Link
                        className="p-5 bg-[#6556CD] rounded-lg"
                        to={`${pathname}/trailer`}
                    >
                        <i className="text-xl ri-play-fill mr-3"></i>
                        Play Trailer
                    </Link>
                </div>
            </div>

            {/* Part 3 Recommendations and Similar Stuff */}
            <hr className="mt-10 mb-5 border-none h-[2px] bg-gray-500" />
            <h1 className="text-3xl font-bold">Recommendations & Similar Stuff</h1>
            <HorizontalCards
                data={info.Recommendations && info.Recommendations.length > 0
                    ? info.Recommendations
                    : []}
            />
            <Outlet />
        </div>
    ) : (
        <Loading />
    );
};

export default TvDetails;

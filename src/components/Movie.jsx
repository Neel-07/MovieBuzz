import axios from "../utils/axios"; // Ensure this axios instance is properly configured
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import TopNav from "./templates/TopNav"; // Updated import
import Dropdown from "./templates/Dropdown"; // Updated import
import Cards from "./templates/Cards"; // Updated import

const Movie = () => {
    document.title = "MovieBuzz | Movies";

    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing"); // Default category
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const GetMovies = async () => {
        try {
            // Use OMDb API to fetch movies. Adjust query parameters as needed.
            const { data } = await axios.get(
                `/?s=${category}&type=movie&page=${page}`
            );

            if (data.Response === "True") {
                setMovies((prevState) => [...prevState, ...data.Search]);
                setPage(page + 1);
            } else {
                setHasMore(false); // No more results or error
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const refreshHandler = () => {
        setMovies([]); // Clear previous results
        setPage(1); // Reset page number
        GetMovies();
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return movies.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="px-[5%] w-full flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Movie
                    <small className="ml-2 text-sm text-zinc-600">
                        ({category})
                    </small>
                </h1>
                <div className="flex items-center w-[80%]">
                    <TopNav /> {/* Updated component */}
                    <Dropdown
                        title="Category"
                        options={[
                            "popular",
                            "top_rated",
                            "upcoming",
                            "now_playing",
                        ]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={movies.length}
                next={GetMovies}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={movies} title="movie" /> {/* Updated component */}
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default Movie;

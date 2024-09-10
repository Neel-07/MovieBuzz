import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import TopNav from "./templates/TopNav"; // Updated import
import Dropdown from "./templates/Dropdown"; // Updated import
import Cards from "./templates/Cards"; // Updated import

const Tvshows = () => {
    document.title = "MovieBuzz | TV Shows";

    const navigate = useNavigate();
    const [category, setCategory] = useState("popular"); // Changed default category to "popular" for OMDB
    const [tv, setTv] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const GetTv = async () => {
        try {
            // Use OMDB API endpoint and parameters
            const { data } = await axios.get(`https://www.omdbapi.com/?s=${category}&page=${page}`);
            if (data.Search && data.Search.length > 0) {
                setTv((prevState) => [...prevState, ...data.Search]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const refreshHandler = () => {
        if (tv.length === 0) {
            GetTv();
        } else {
            setPage(1);
            setTv([]);
            GetTv();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return tv.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="px-[5%] w-full flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    TV Shows
                    <small className="ml-2 text-sm text-zinc-600">
                        ({category})
                    </small>
                </h1>
                <div className="flex items-center w-[80%]">
                    <TopNav /> {/* Updated import */}
                    <Dropdown
                        title="Category"
                        options={[
                            "popular",
                            "top_rated", // Adjust if categories are not available in OMDB
                        ]}
                        func={(e) => setCategory(e.target.value)}
                    />
                    <div className="w-[2%]"></div>
                </div>
            </div>

            <InfiniteScroll
                dataLength={tv.length}
                next={GetTv}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={tv} title="tv" /> {/* Updated import */}
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default Tvshows;

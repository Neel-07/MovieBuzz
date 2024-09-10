import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
    document.title = "MovieBuzz | Trending";
    const navigate = useNavigate();
    const [category, setcategory] = useState("movie"); // Default to movie
    const [searchTerm, setsearchTerm] = useState(""); // For search queries
    const [trending, settrending] = useState([]);
    const [hasMore, sethasMore] = useState(true); // This may not be needed if no pagination

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(
                `/?s=${searchTerm || "popular"}&type=${category}`
            );

            if (data.Response === "True") {
                settrending((prevState) => [...prevState, ...data.Search]);
                sethasMore(data.Search.length > 0); // Check if more results exist
            } else {
                sethasMore(false); // No more results
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const refershHandler = () => {
        settrending([]); // Clear previous results
        GetTrending();
    };

    useEffect(() => {
        refershHandler();
    }, [category, searchTerm]);

    return trending.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="px-[5%] w-full flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Trending
                </h1>
                <div className="flex items-center w-[80%]">
                    <TopNav />
                    <Dropdown
                        title="Category"
                        options={["movie", "tv"]}
                        func={(e) => setcategory(e.target.value)}
                    />
                    <div className="w-[2%]"></div>
                    <Dropdown
                        title="Search"
                        options={["popular", "latest", "top"]}
                        func={(e) => setsearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={trending.length}
                next={GetTrending}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={trending} title={category} />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default Trending;

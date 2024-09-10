import axios from "../utils/axios"; // Ensure this axios instance is properly configured
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import TopNav from "./templates/TopNav"; // Updated import
import Dropdown from "./templates/Dropdown"; // Updated import
import Cards from "./templates/Cards"; // Updated import

const Popular = () => {
    document.title = "MovieBuzz | Popular";

    const navigate = useNavigate();
    const [category, setCategory] = useState("movie"); // Default category
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const GetPopular = async () => {
        try {
            // Use OMDb API for popular results
            const { data } = await axios.get(
                `/?s=popular&type=${category}&page=${page}`
            );

            if (data.Response === "True") {
                setPopular((prevState) => [...prevState, ...data.Search]);
                setPage(page + 1);
            } else {
                setHasMore(false); // No more results or error
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const refreshHandler = () => {
        setPopular([]); // Clear previous results
        setPage(1); // Reset page number
        GetPopular();
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return popular.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="px-[5%] w-full flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Popular
                </h1>
                <div className="flex items-center w-[80%]">
                    <TopNav /> {/* Updated component */}
                    <Dropdown
                        title="Category"
                        options={["movie", "tv"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={popular.length}
                next={GetPopular}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={popular} title={category} />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default Popular;


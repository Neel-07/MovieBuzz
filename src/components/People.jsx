import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import TopNav from "./templates/TopNav"; // Updated import
import Dropdown from "./templates/Dropdown"; // Updated import
import Cards from "./templates/Cards"; // Updated import

const People = () => {
    document.title = "MovieBuzz | People";

    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const GetPeople = async () => {
        try {
            // Use OMDB API endpoint and parameters
            const { data } = await axios.get(`https://www.omdbapi.com/?s=${category}&page=${page}`);
            if (data.Search && data.Search.length > 0) {
                setPeople((prevState) => [...prevState, ...data.Search]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const refreshHandler = () => {
        if (people.length === 0) {
            GetPeople();
        } else {
            setPage(1);
            setPeople([]);
            GetPeople();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return people.length > 0 ? (
        <div className="w-screen h-screen">
            <div className="px-[5%] w-full flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    People
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
                dataLength={people.length}
                next={GetPeople}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={people} title="person" /> {/* Updated import */}
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default People;

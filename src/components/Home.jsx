import { useEffect, useState } from "react";
import Sidenav from "./templates/SideNav";
import Topnav from "./templates/TopNav";
import axios from "../utils/axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";

const Home = () => {
    document.title = "MovieBuzz | Homepage";
    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setCategory] = useState("all");

    // Fetch a random movie to use as the header wallpaper
    const GetHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`/?s=popular&type=movie`);
            let randomData = data.Search[(Math.random() * data.Search.length).toFixed()];
            setWallpaper(randomData);
        } catch (error) {
            console.log("Error fetching wallpaper: ", error);
        }
    };

    // Fetch trending movies/series based on the category
    const GetTrending = async () => {
        try {
            let query = category === "all" ? "batman" : category; // Simulate category search
            const { data } = await axios.get(`/?s=${query}&type=${category === "all" ? "" : category}`);
            setTrending(data.Search);
        } catch (error) {
            console.log("Error fetching trending: ", error);
        }
    };

    useEffect(() => {
        GetTrending();
        !wallpaper && GetHeaderWallpaper();
    }, [category]);

    return wallpaper && trending ? (
        <>
            <Sidenav />
            <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
                <Topnav />
                <Header data={wallpaper} />
                <div className="flex justify-between p-5">
                    <h1 className="text-3xl font-semibold text-zinc-400">
                        Trending
                    </h1>

                    <Dropdown
                        title="Filter"
                        options={["movie", "series", "all"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                </div>
                <HorizontalCards data={trending} />
            </div>
        </>
    ) : (
        <Loading />
    );
};

export default Home;

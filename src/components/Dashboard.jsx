import { useState, useEffect } from "react";
import Profile from "./Profile";
import {
    BarsArrowUpIcon,
    BarsArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
    const steamID = new URLSearchParams(window.location.search).get("steamID");
    const profileUrl = `https://us-central1-steamback-f4d3f.cloudfunctions.net/userProfile?steamID=${steamID}`;
    const gamesUrl = `https://us-central1-steamback-f4d3f.cloudfunctions.net/userGames?steamID=${steamID}`;

    const [games, setGames] = useState([]); // base unchaged data from server
    const [unplayed, setUnplayed] = useState([]);
    const [profile, setProfile] = useState([]); // array that contains user info
    const [loading, setLoading] = useState(true);
    const [sortDirection, setSortDirection] = useState(true); // true is A-Z false is Z-A
    // Types = 0: alpha, 1: playtime, 2: last played
    const [sortType, setSortType] = useState(0);

    // Below i have 3 sorting functions that update the "unplayed" state variable
    // If the current sort type is already what is requestd the functions
    // will simply reverse the current array. For eg if the array is already sorted
    // by playtime and the user clicks the button it assumes they want to sort
    // it in the opposite direction

    const alphaSort = () => {
        if (sortType == 0) {
            setUnplayed([...unplayed].reverse());
            setSortDirection(!sortDirection);
        } else {
            setUnplayed(
                [...unplayed].sort((a, b) =>
                    a.name.toUpperCase().localeCompare(b.name.toUpperCase())
                )
            );
            setSortType(0);
            setSortDirection(!sortDirection);
        }
    };

    const playtimeSort = () => {
        if (sortType == 1) {
            setUnplayed([...unplayed].reverse());
            setSortDirection(!sortDirection);
        } else {
            setUnplayed(
                [...unplayed].sort((game1, game2) => {
                    // Sorts by game with most playtime
                    return game2.playtime_forever - game1.playtime_forever;
                })
            );
            setSortType(1);
            setSortDirection(!sortDirection);
        }
    };

    const lastPlayedSort = () => {
        if (sortType == 2) {
            setUnplayed([...unplayed].reverse());
            setSortDirection(!sortDirection);
        } else {
            setUnplayed(
                [...unplayed].sort((game1, game2) => {
                    // Sorts by game played most recently
                    return game2.rtime_last_played - game1.rtime_last_played;
                })
            );
            setSortType(2);
            setSortDirection(!sortDirection);
        }
    };

    // Got this from Mozilla's AI thing on their website
    const formatUnixTimestamp = (unixTimestamp) => {
        if (unixTimestamp == 0) {
            return "N/A";
        }

        // Create a new Date object from the UNIX timestamp
        const date = new Date(unixTimestamp * 1000);

        // Format the date components
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour format
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const day = date.getDate();
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        // Construct the formatted string
        return `${formattedHours}:${formattedMinutes} ${ampm} - ${month} ${day}, ${year}`;
    };

    // on page load, fetch all information from cloud function
    useEffect(() => {
        fetch(gamesUrl)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setGames(data.response.games);
            })
            .then(() => {
                fetch(profileUrl)
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        setProfile(data.response.players[0]);
                        document.title = `${data.response.players[0].personaname} - SteamBack`;
                        setLoading(false);
                    });
            });
    }, []);

    // special useEffect that runs only when the games state array is changed
    // this only happends once after its state is set
    useEffect(() => {
        let sorted = [];

        for (let i = 0; i < games.length; i++) {
            let game = games[i];

            if (game.playtime_forever <= 60) {
                sorted.push(game);
            }
        }

        let alphaSort = [...sorted].sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase())
        );

        setUnplayed(alphaSort);
    }, [games]);

    if (loading) {
        return (
            <div>
                <h1 className="text-4xl text-white">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="text-white mb-12 flex flex-col justify-center place-items-center">
            <Profile data={profile} />
            <div className="mx-4 text-center">
                <p className="font-medium text-xl lg:text-2xl mx-4 mb-2">
                    Below you will find all of your (paid) games that you have
                    not played
                </p>
                <p className="text-base sm:text-lg text-gray-700 mb-8 lg:mb-12">
                    * Games are considered unplayed if the user has played less
                    than 60 minutes.
                </p>
            </div>
            <div className="flex flex-row gap-4">
                <button
                    className="flex gap-2 items-center bg-pink-600 border-4 border-pink-500 px-2 py-1.5 rounded-xl mb-6 hover:bg-indigo-900 hover:border-pink-600 transition-all duration-300"
                    onClick={alphaSort}
                >
                    {sortDirection == false && (
                        <BarsArrowUpIcon className="h-6" />
                    )}
                    {sortDirection == true && (
                        <BarsArrowDownIcon className="h-6" />
                    )}
                    Sort Alphabetically
                </button>
                <button
                    className="flex gap-2 items-center bg-pink-600 border-4 border-pink-500 px-2 py-1.5 rounded-xl mb-6 hover:bg-indigo-900 hover:border-pink-600 transition-all duration-300"
                    onClick={playtimeSort}
                >
                    {sortDirection == false && (
                        <BarsArrowUpIcon className="h-6" />
                    )}
                    {sortDirection == true && (
                        <BarsArrowDownIcon className="h-6" />
                    )}
                    Sort By Playtime
                </button>
                <button
                    className="flex gap-2 items-center bg-pink-600 border-4 border-pink-500 px-2 py-1.5 rounded-xl mb-6 hover:bg-indigo-900 hover:border-pink-600 transition-all duration-300"
                    onClick={lastPlayedSort}
                >
                    {sortDirection == false && (
                        <BarsArrowUpIcon className="h-6" />
                    )}
                    {sortDirection == true && (
                        <BarsArrowDownIcon className="h-6" />
                    )}
                    Sort By Last Played
                </button>
            </div>

            <div className="flex flex-wrap justify-center transition-all duration-300 gap-6 mx-4">
                {unplayed.map((game) => {
                    const image = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;

                    return (
                        <a
                            href={`https://store.steampowered.com/app/${game.appid}`}
                            target="__blank"
                            className="bg-indigo-900 rounded px-8 py-3 drop-shadow-xl hover:scale-105 transition-all duration-300"
                            key={game.appid}
                        >
                            <p className="font-bold text-lg lg:text-2xl text-pink-500 underline">
                                {game.name}
                            </p>
                            <div className="flex flex-row gap-2">
                                <p className="px-2 py-1 bg-gray-700 w-fit rounded text-sm mt-3 mb-2">
                                    {game.appid}
                                </p>
                                <p className="px-2 py-1 bg-gray-700 w-fit rounded text-sm mt-3 mb-2">
                                    {game.playtime_forever} Minutes Played
                                </p>
                                <p className="px-2 py-1 bg-gray-700 w-fit rounded text-sm mt-3 mb-2">
                                    Last Played:{" "}
                                    {formatUnixTimestamp(
                                        game.rtime_last_played
                                    )}
                                </p>
                            </div>
                            <img
                                src={image}
                                alt="Image not found"
                                className="h-24 mt-1 rounded"
                                loading="lazy"
                            />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

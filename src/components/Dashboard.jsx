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

    // function to reverse the order of array
    const alphaRev = () => {
        setUnplayed([...unplayed].reverse());
        console.log(unplayed[0].name);
        setSortDirection(!sortDirection);
        console.log(sortDirection);
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

        let alphaSort = [...sorted].sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

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
            <button
                className="flex gap-2 items-center bg-pink-600 border-4 border-pink-500 px-2 py-1.5 rounded-xl mb-6"
                onClick={alphaRev}
            >
                {sortDirection == false && <BarsArrowUpIcon className="h-6" />}
                {sortDirection == true && <BarsArrowDownIcon className="h-6" />}
                Sort Alphabetically
            </button>

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
                            <p className="px-2 py-1 bg-gray-700 w-fit rounded text-sm mt-3 mb-2">
                                {game.appid}
                            </p>
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

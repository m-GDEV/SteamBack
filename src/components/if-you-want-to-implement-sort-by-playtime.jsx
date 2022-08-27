import { useState, useEffect } from "react";
import Profile from "./Profile";
import {
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    EyeIcon,
    EyeSlashIcon,
    CalendarIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
    const steamID = new URLSearchParams(window.location.search).get("steamID");
    const profileUrl = `https://us-central1-steamback-f4d3f.cloudfunctions.net/userProfile?steamID=${steamID}`;
    const gamesUrl = `https://us-central1-steamback-f4d3f.cloudfunctions.net/userGames?steamID=${steamID}`;

    const [games, setGames] = useState([]); // base unchaged data from server
    const [playtimeSorted, setPlaytimeSorted] = useState([]); // array that sorts games array by playtime
    const [alphaSorted, setAlphaSorted] = useState([]); // array that sorts games array by alphabectical order
    const [unplayed, setUnplayed] = useState([]);
    const [profile, setProfile] = useState([]); // array that contains user info
    const [loading, setLoading] = useState(true);

    // two functions to reverse the order of each array
    const playtimeRev = () => {
        setPlaytimeSorted([...playtimeSorted].reverse());
        console.log(playtimeSorted[0].name);
    };

    const alphaRev = () => {
        setAlphaSorted([...alphaSorted].reverse());
        console.log(alphaSorted[0].name);
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
        // most playtime at bottom
        let playtimeSort = [...games].sort(
            (a, b) => a.playtime_forever - b.playtime_forever
        );

        let alphaSort = [...games].sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        setPlaytimeSorted(playtimeSort);
        setAlphaSorted(alphaSort);
    }, [games]);

    useEffect(() => {
        for (let i = 0; i < games.length; i++) {
            let game = playtimeSorted[i];
            let playtime = game.playtime_forever / 60;

            if (playtime == 0) {
                setUnplayed((unplayed) => [...unplayed, game]);
            }
        }
    }, [playtimeSorted]);

    if (loading) {
        return (
            <div>
                <h1 className="text-4xl text-white">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="text-white mb-12">
            <Profile data={profile} />
            <div className="flex flex-wrap justify-center transition-all duration-300 gap-6 mx-4">
                {unplayed.map((game) => {
                    // const image = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo}.jpg`;
                    const image = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;

                    return (
                        <div className="bg-blue-900 rounded px-8 py-3">
                            <p className="font-bold text-lg lg:text-2xl text-indigo-400">
                                {game.name}
                            </p>
                            <p>{game.appid}</p>
                            <img src={image} className="h-24" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


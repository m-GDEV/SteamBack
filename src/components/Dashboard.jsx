import { useState, useEffect } from "react";
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

    const onlineState = [
        "Offline",
        "Online",
        "Busy",
        "Away",
        "Snooze",
        "Looking to Trade",
        "Looking to Play",
    ];
    const onlineIcons = [
        <XCircleIcon className="h-7 text-red-500" />,
        <CheckCircleIcon className="h-7 text-green-500" />,
        <ClockIcon className="h-7 text-yellow-500" />,
        <CalendarIcon className="h-7 text-yellow-500" />,
        <ClockIcon className="h-7 text-yellow-500" />,
    ];

    // two functions to reverse the order of each array
    const playtimeRev = () => {
        setPlaytimeSorted([...playtimeSorted].reverse());
        console.log(playtimeSorted[0].name);
    };

    const alphaRev = () => {
        setAlphaSorted([...alphaSorted].reverse());
        console.log(alphaSorted[0].name);
    };

    const unixToDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleString("en-US");
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
            <div className="mb-4 text-center">
                <p className="text-4xl">
                    Welcome
                    <a className="text-blue-700 ml-2" href={profile.profileurl}>
                        {profile.personaname}
                    </a>
                </p>
            </div>
            <div className="flex flex-row gap-8 mb-10 items-end">
                <div className="flex flex-col justify-center gap-2">
                    <img
                        src={profile.avatarfull}
                        className="h-40 rounded-2xl"
                    />
                    <p className="bg-slate-800 py-2 px-3 rounded text-sm">
                        {profile.steamid}
                    </p>
                </div>
                <div className="flex flex-col gap-2 text-center">
                    <div className="flex flex-row justify-around">
                        <div>
                            {profile.communityvisibilitystate == 3 && (
                                <div className="flex items-center gap-2">
                                    <EyeIcon className="h-7 text-green-500" />
                                    <p>Public</p>
                                </div>
                            )}
                            {profile.communityvisibilitystate == 1 && (
                                <div className="flex items-center gap-2">
                                    <EyeSlashIcon className="h-7 text-red-500" />
                                    <p>Private</p>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {onlineIcons[profile.personastate]}
                            {onlineState[profile.personastate]}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="bg-slate-800 py-2 px-3 rounded">
                            {profile.accountname}
                        </p>
                        <p className="bg-slate-800 py-2 px-3 rounded">
                            {profile.realname}
                        </p>
                    </div>
                    <div className="font-bold">
                        <p className="mt-2 flex flex-row justify-between items-center gap-4 text-indigo-500">
                            Last Online:
                            <nobr className="bg-slate-800 px-3 py-2 rounded text-yellow-500">
                                {unixToDate(profile.lastlogoff)}
                            </nobr>
                        </p>
                        <p className="mt-2 flex flex-row justify-between items-center gap-4 text-violet-500">
                            Account Created:
                            <nobr className="bg-slate-800 px-3 py-2 rounded text-yellow-500">
                                {unixToDate(profile.timecreated)}
                            </nobr>
                        </p>
                    </div>
                </div>
            </div>
            <button onClick={playtimeRev}>Click!</button>
            <button onClick={alphaRev}>Click!</button>
            {unplayed.map((game) => {
                return <div>{game.name}</div>;
            })}
        </div>
    );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [steamID, setSteamID] = useState("");
    const [ready, setReady] = useState(false);
    const [valid, setValid] = useState(false);

    let message = !valid && ready ? "SteamID Invalid" : "";
    let url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=9B7D9DC372569E211AEF25A943E65105&steamid=${steamID}`;

    useEffect(() => {
        document.title = "SteamBack - easily view your steam backlog";
    }, []);

    function checkSteamID(steamID) {
        fetch(url, { mode: "no-cors" })
            .then((response) => {
                console.log(url);
                console.log(response);
            })
            .then((response) => {
                if (!response.ok) {
                    setValid(false);
                    setReady(true);
                    console.log(response);
                    console.log(response.ok);
                    console.log(response.status);
                } else if (response.ok) {
                    setReady(true);
                    console.log("working");

                    navigate(`/dashboard?steamID=${steamID}`);
                }
            });
    }

    return (
        <div className="container flex flex-col justify-center place-items-center">
            <h2 className="text-2xl text-white">
                Welcome to SteamBack, please enter your SteamID
            </h2>
            <form
                className="mt-4"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <input
                    type="text"
                    autoComplete="false"
                    autoFocus
                    placeholder="Enter SteamID"
                    value={steamID}
                    onChange={(e) => setSteamID(e.target.value)}
                    className="py-2 px-4 bg-slate-800 border-blue-600 border-[3px] rounded-md mr-2 outline-none text-white"
                />
                <button
                    className="bg-blue-600 py-2 px-4 rounded-md text-slate-900 transition-all duration-500 hover:bg-blue-500"
                    onClick={() => {
                        checkSteamID(steamID);
                    }}
                    onKeyPress={(e) => {
                        e.key === "Enter" ? checkSteamID(steamID) : null;
                    }}
                    type="submit"
                >
                    Submit
                </button>
            </form>
            <p className="text-red-500 mt-4">{message}</p>
        </div>
    );
}

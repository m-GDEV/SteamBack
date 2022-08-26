import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [steamID, setSteamID] = useState("");
    const [ready, setReady] = useState(false);
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();

    let message = !valid && ready ? "SteamID Invalid" : "";

    function checkSteamID(steamID) {
        let url = `https://us-central1-steamback-f4d3f.cloudfunctions.net/userGames?steamID=${steamID}`;
        fetch(url).then((response) => {
            if (response.ok) {
                navigate(`/dashboard?steamID=${steamID}`);
            } else {
                setReady(true);
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

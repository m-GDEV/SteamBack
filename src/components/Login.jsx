import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Login() {
    const [steamID, setSteamID] = useState("");
    const [ready, setReady] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const valid = false;
    const toggle = open == false ? "max-h-0" : "max-h-[400px]";
    const rotate = open == false ? "" : "rotate-180";

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
            <p className="text-red-500 mt-4 ">{message}</p>

            <div className="text-white mt-4">
                <div
                    className="cursor-pointer p-2 border-2 border-pink-600 rounded-md text-lg text-green-500 flex items-center gap-2 justify-center"
                    onClick={() => setOpen(!open)}
                >
                    <ChevronDownIcon
                        className={"h-4 transition-all duration-300" + rotate}
                    />
                    <p> How to find steamID?</p>
                </div>

                <div
                    className={`${toggle} transition-all duration-300 overflow-hidden mt-10 text-center flex flex-col justify-center place-items-center`}
                >
                    <p>1. Go to your Steam profile page and copy the link.</p>
                    <p>
                        2. Go to{" "}
                        <a
                            href="https://steamdb.info/calculator"
                            className="font-bold text-lg text-yellow-500"
                        >
                            SteamDB's Calculator
                        </a>{" "}
                        and enter the link you copied.
                    </p>
                    <p className="text-red-500">
                        3. Get depressed about how much money you've spent on
                        games
                    </p>
                    <p>
                        4. Scroll to this section near the top of the page and
                        copy the item the says SteamID (the third one)
                    </p>
                    <img
                        src="/steamid-help.png"
                        className="mt-4 rounded-xl w-96"
                    />
                </div>
            </div>
        </div>
    );
}

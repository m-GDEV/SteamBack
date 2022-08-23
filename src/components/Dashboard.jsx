import { useState } from "react";

export default function Dashboard() {
    const key = "66FE24C9CDA273164A5A57D6B610185D";
    const steamID = "76561198385824684";
    const [data, setData] = useState([]);
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamID}&format=json`;

    fetch(url, { mode: "cors" }).then((response) => {
        console.log("custom");
        console.log(response.status);
        console.log(url);
        response.json();
    });

    return <div>{data}</div>;
}

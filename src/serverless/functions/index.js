const fetch = require("node-fetch");
const exit = require("process").exit;
const functions = require("firebase-functions");

const key = "66FE24C9CDA273164A5A57D6B610185D";

exports.userGames = functions.https.onRequest((request, response) => {
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${request.query.steamID}&include_appinfo=true`;
    response.set("Access-Control-Allow-Origin", "*");

    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                response.status(404);
                response.send({ err: "ERROR FETCHING DATA" });
                exit();
            }
        })
        .then((data) => {
            response.send(data);
        });
});

exports.userProfile = functions.https.onRequest((request, response) => {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${request.query.steamID}`;
    response.set("Access-Control-Allow-Origin", "*");

    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                response.status(404);
                response.send({ err: "ERROR FETCHING DATA" });
                exit();
            }
        })
        .then((data) => {
            response.send(data);
        });
});

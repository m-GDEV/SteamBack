const fetch = require("node-fetch");
const exit = require("process").exit;

const steamID = "76561198385824684";
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

function helloWorld() {
    fetch(
        "https://us-central1-steamback-f4d3f.cloudfunctions.net/userProfile?steamID=76561198385824684"
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                console.log("popo");
                exit();
            }
        })
        .then((data) => console.log(data))
        .catch((err) => console.log("ERROR:" + err));
}

helloWorld();

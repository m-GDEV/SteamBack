const fetch = require("node-fetch");

fetch(
    "http://localhost:5001/steamback-f4d3f/us-central1/steamApi?steamID=7656119838582468"
)
    .then((res) => res.json())
    .then((data) => console.log(data));

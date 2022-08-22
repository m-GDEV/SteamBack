fetch(
    "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=9B7D9DC372569E211AEF25A943E65105&steamid=76561198385824684&include_appinfo=true&include_played_free_games=false"
)
    .then((data) => data.json())
    .then((data) => {
        let games = data.response.games;

        // Playtime Sort
        let playtime_sort = games.sort(
            (a, b) => a.playtime_forever - b.playtime_forever
        );
        // playtime_sort = playtime_sort.reverse();

        // Alphabetical Sort
        // let alpha_sort = games.sort((a, b) => {
        //     const nameA = a.name.toUpperCase();
        //     const nameB = b.name.toUpperCase();
        //
        //     if (nameA < nameB) return -1;
        //     if (nameA > nameB) return 1;
        //     return 0;
        // });
        // alpha_sort = alpha_sort.reverse();

        for (let i = 0; i < games.length; i++) {
            let game = playtime_sort[i];
            let playtime = game.playtime_forever / 60;

            if (playtime === 0) {
                continue;
            }

            console.log("\n-----------");
            console.log(`${game.name} - ${game.appid}`);
            console.log(`Playtime ${Math.round(playtime)} Hours`);
            console.log(
                `IMG URL: http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
            );
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

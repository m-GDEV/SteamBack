const key = "66FE24C9CDA273164A5A57D6B610185D";
const steamID = "76561198385824684";
const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamID}&format=json`;

fetch(
    "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=66FE24C9CDA273164A5A57D6B610185D&steamid=76561198385824684&format=json&include_appinfo=true"
)
    .then((data) => data.json())
    .then((data) => {
        let games = data.response.games;

        // Playtime Sort
        let playtime_sort = [...games].sort(
            (a, b) => a.playtime_forever - b.playtime_forever
        );
        playtime_sort = playtime_sort.reverse();
        console.log(playtime_sort);

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

        // for (let i = 0; i < games.length; i++) {
        //     let game = playtime_sort[i];
        //     let playtime = game.playtime_forever / 60;
        //
        //     if (playtime === 0) {
        //         // console.log("YAS");
        //         console.log(game.name);
        //         continue;
        //     }

        // console.log("\n-----------");
        // console.log(`${game.name} - ${game.appid}`);
        // console.log(`Playtime ${Math.round(playtime)} Hours`);
        // console.log(
        //     `IMG URL: http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
        // );
        // }
    });

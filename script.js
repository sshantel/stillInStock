require("dotenv").config();
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const fetch = require("node-fetch");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const searchFinnhub = (stocktickerSym) => {
  readline.question("What is your stocktickerSymbol? ", (stocktickerSym) => {
    console.log(`Fetching results for ${stocktickerSym}...`);
    readline.close;
    const webhookUrl = `https://finnhub.io/api/v1/search?q=${stocktickerSym}&token=${FINNHUB_API_KEY}`;

    fetch(webhookUrl)
      .then((response) => {
        if (response.status === 200) {
          console.log("yay!");
        } else {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(
          `we found ${data.count} results! Please confirm which one it is`
        );
        data.result.forEach((r, i) => {
          const selection = i + 1;
          const { description, symbol } = r;
          console.log(
            `${selection} description: ${description} symbol: ${symbol}`
          );
        });
        readline.question("Which # is it? ", (stocktickerSymbol) => {
          const basicFinancialsUrl = `https://finnhub.io/api/v1//stock/metric?symbol=${stocktickerSymbol}&metric=all&token=${FINNHUB_API_KEY}`;
          fetch(basicFinancialsUrl)
            .then((response) => {
              if (response.status === 200) {
                console.log("yay!");
              } else {
                throw Error(response.statusText);
              }
              return response.json();
            })
            .then((data) => {});
          data.result.forEach((r, i) => {
            const { annual } = r;
          });
        });
      });
  });
};
searchFinnhub();

// console.log(
//   data.result.map((r) => ({
//     description: r.description,
//     symbol: r.symbol,
//   }))
// );

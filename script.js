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
        var dict = {};
        var selection;
        data.result.forEach((r, i) => {
          selection = i + 1;
          console.log(selection, " ", r.symbol, " ", r.description);
        });
        readline.question("Which # is it?", function (input) {
          var arrayOfInputs = input.trim().split(" ");
          console.log(arrayOfInputs);
          stocktickerIndex = arrayOfInputs[0];
          console.log(stocktickerIndex);
          initialDate = arrayOfInputs[1];
          initialDate = convertDateToUnixTimestamp(initialDate);
          sellDate = arrayOfInputs[2];
          sellDate = convertDateToUnixTimestamp(sellDate);
          stocktickerSymbol = data.result[stocktickerIndex - 1].symbol;
          console.log(stocktickerSymbol);
          const stockCandlesUrl = `https://finnhub.io/api/v1/stock/candle?symbol=${stocktickerSymbol}&resolution=1&from=${initialDate}&to=${sellDate}&token=${FINNHUB_API_KEY}`;
          console.log(stockCandlesUrl);
          fetch(stockCandlesUrl)
            .then((response) => {
              if (response.status === 200) {
                console.log("yay!");
              } else {
                throw Error(response.statusText);
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
            });
          data.result.forEach((r, i) => {
            const { annual } = r;
          });
        });
      });
  });
};
searchFinnhub();

function convertDateToUnixTimestamp(dateInput) {
  var date = new Date(dateInput);
  var unixTimeStamp = Math.floor(date.getTime() / 1000);
  return unixTimeStamp;
}

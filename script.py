const fetch = require("node-fetch");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const searchFinnhub = (stocktickerSym) => {
  readline.question("What is your stocktickerSymbol? ", (stocktickerSym) => {
    console.log(`Fetching results for ${stocktickerSym}...`);
    readline.close;
    const url = `https://finnhub.io/api/v1/search?q=${stocktickerSym}&token=c08fqm748v6plm1eq130`;
    console.log(url);
    fetch(url)
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
        readline.question("Which symbol is it? ", (symbol, description) => {});
        console.log(
          data.result.map((r) => ({
            description: r.description,
            symbol: r.symbol,
          }))
        );
      });
  });
};
searchFinnhub();

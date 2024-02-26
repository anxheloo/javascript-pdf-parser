const fs = require("fs");
const pdf = require("pdf-parse");

let dataBuffer = fs.readFileSync("./sample_fatura.pdf");

pdf(dataBuffer).then(function (data) {
  // number of pages
  console.log(data.numpages);

  // number of rendered pages
  console.log(data.numrender);
  // PDF info
  console.log(data.info);
  // PDF metadata
  console.log(data.metadata);
  // PDF.js version
  // check https://mozilla.github.io/pdf.js/getting_started/
  console.log(data.version);
  // PDF text
  console.log(data.text);

  console.log("this is data :", data);

  const textArray = data.text.split("\n");
  console.log("This is textArray:", textArray);

  console.log("This is Codice Fiscale: textArray[5]:", textArray[5]);

  const pages = data.text.split("Pagina");
  console.log("THis is pages length:", pages.length);

  console.log("This is page 1:", pages[0]);

  console.log("This is page 2:", pages[1]);

  // console.log("This is page 3:", pages[2]);

  // console.log("This is page 4:", pages[3]);

  // console.log("This is page 5:", pages[4]);

  // console.log("This is page 6:", pages[5]);

  // console.log("This is page 7:", pages[6]);
});

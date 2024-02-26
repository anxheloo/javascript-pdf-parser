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
});

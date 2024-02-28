// const express = require("express");
import express from "express";
import { PdfReader } from "pdfreader";
// const fs = require("fs");
import fileUpload from "express-fileupload";
import cors from "cors";

const app = express();
// Configure express-fileupload
app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use("/", express.static("public"));

// new PdfReader().parseFileItems("./sample_fatura.pdf", (err, item) => {
//   if (err) console.log("THis is error: ", err);
//   else if (!item) console.warn("end of file");
//   else if (("This is item.text: ", item.text)) {
//      res.status(200).json(item.text);
//     console.log(item.text);
//   }
// });

app.post("/extract-text", (req, res) => {
  console.log("Inside post method");
  let text = ""; // Initialize an empty string to accumulate the text

  // if (!req.files && !req.files.pdfFile) {
  //   res.status(400).json({ message: "No file provided" });
  //   return;
  // }

  // console.log("This is req.files:", req.files);

  // // req.files.pdfFile
  new PdfReader().parseFileItems("./sample_fatura.pdf", (err, item) => {
    if (err) {
      console.log("THis is error: ", err);
      res
        .status(500)
        .json({ error: "An error occurred while parsing the PDF file" });
      return;
    }

    if (!item) {
      console.warn("end of file");
      res.status(200).json({ text }); // Send the accumulated text in the response
      return;
    }

    if (item.text) {
      text += item.text + "\n";
      // console.log("This is item.text: ", text);
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// app.post("/extract-text", (req, res) => {
//   if (!req.files && !req.files.pdfFile) {
//     res.status(400).json({ message: "No file provided" });
//     return;
//   }

//   console.log("This is req.files:", req.files);

//   pdf(req.files.pdfFile).then((result) => {
//     res.status(200).json({ result: result.text });
//   });
// });

// app.get("/", (req, res) => {
//   const dataBuffer = fs.readFileSync("./sample_fatura.pdf");
//   pdf(dataBuffer).then((data) => {
//     const textArray = data.text.split("\n");
//     const pages = data.text.split("Pagina");
//     const page1 = pages[0].split("\n");
//     const page2 = pages[1].split("\n");
//     const page3 = pages[2].split("\n");
//     const page4 = pages[3].split("\n");
//     const page5 = pages[4].split("\n");
//     const page6 = pages[5].split("\n");

//     res.status(200).json({
//       //   NumPage: data.numpages,
//       //   Page1: page1,
//       //   Page2: page2,
//       //   Page3: page3,
//       //   Page4: page4,
//       //   Page5: page5,
//       //   Page6: page6,
//       DATATEXT: data.text,
//       SplittedBy: textArray,

//       CodicePOD: page1[12],
//       LaFornituraDiEnergiaElettricaEIn:
//         page1[19] + "," + page1[20] + "," + page1[21],
//       Periodo: page1[25],
//       FaturaElettronica: page1[26],

//       PAGE2: "PAGE 2 STARTS HERE:",

//       LOffertaa: page2[3] + " " + page2[4],

//       CodiceOffertaa: page2[5],

//       DataAttivazioneOffertaa: page2[6],

//       ScadenzaOffertaa: page2[7],

//       ScadenzaContrattoo: page2[8],

//       TensioneDiFonituraa: page2[11],

//       PotenzaDisponibilee: page2[12],

//       DistributoreDiRiferimentoo: page2[13],

//       RiepilogoLetturee: page2[53],

//       TableHead: page2[54],

//       TableRow1: page2[55],

//       TableRow2: page2[56],

//       TableRow3: page2[57],

//       TableRow4: page2[58],

//       TableRow5: page2[59],

//       TableRow6: page2[60],

//       TableRow7: page2[61],

//       TableRow8: page2[62],

//       TableRow9: page2[65],

//       TableRow10: page2[66],

//       TableRow11: page2[67],

//       TableRow12: page2[68],

//       TableRow13: page2[69],

//       TableRow14: page2[70],

//       TableRow15: page2[71],

//       TableRow16: page2[72],

//       PAGE5: "THIS IS PAGE 5 datas:",

//       Descrizione: page5[3],
//       EnergiaMono: page5[4],
//       EnergiaMese: page5[5],
//       ScontoPagoPuntualeLuce: page5[6],
//       QuotaFissa: page5[12],
//       CommercializzazioneVendita: page5[13],
//       ScontoBolletaDigitale: page5[14],
//       ScontoFedeltaLuce: page5[15],

//       QuotaPotenza:
//         page5[30] +
//         " " +
//         page5[31] +
//         page5[32] +
//         " " +
//         page5[33] +
//         " " +
//         page5[34] +
//         page5[35],

//       //   page[4]
//     });
//   });
// });

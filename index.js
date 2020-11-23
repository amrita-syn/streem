const fetch = require("node-fetch");
const fs = require("fs");
const zipper = require("./zipStream");
const https = require("https");
const urls = require("./urls.json");

zipper.ZipStreamer().then((archive) => {
  Promise.all(
    urls.map((url, i) => {
      console.log(`Trying for ${i}`);
      return fetch(url);
    })
  ).then((responses) => {
    responses.map((response, index) => {
      if (response.ok) {
        archive.append(response.body, { name: `${index}.txt` });
      }
    });
  }).finally(() => archive.finalize());

  // append a file from stream
  // const file1 = './big.file';
  // for (let i = 0; i < 10; i++) {
  //   archive.append(fs.createReadStream(file1), { name: `file${i + 20}.txt` });
  // }
  // archive.finalize();
});

// const archiver = require("archiver");
// const stream = require("stream");
// const request = require("request");
// const fs = require('fs');

// const streamTo = (bucket, key) => {
//   var passthrough = new stream.PassThrough();

//   return passthrough;
// }
// const getStream = (filepath) => {
//   let streamCreated = false;
//   const passThroughStream = new stream.PassThrough();

//   passThroughStream.on("newListener", event => {
//     if (!streamCreated && event == "data") {
//       const fileStream = fs.createReadStream(filepath);
//       fileStream
//         .on("error", err => passThroughStream.emit("error", err))
//         .pipe(passThroughStream);

//       streamCreated = true;
//     }
//   });

//   return passThroughStream;
// };

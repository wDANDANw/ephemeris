var express = require('express');
var path = require('path');

//Do not forget to require compression middleware
var compression = require('compression');
var expressStaticGzip = require("express-static-gzip");

const app = express();
const port = process.env.PORT || 80;


// //Compress all requests
app.use(compression({threshold: 0}));

// For unity game hosts
// // Build Folder Files
// app.use("/game/Build", (req, res, next) => { //change app.all to app.use here and remove '*', i.e. the first parameter part
//     var filename = req.originalUrl.substr(req.originalUrl.lastIndexOf('/') + 1)
//     console.log(filename)
//
//     if (req.originalUrl.includes("/Build/")) {
//         var extensionFile = path.extname(req.originalUrl);
//
//         if (extensionFile !== '.js') { // Do not need to gzip script
//             res.set('Content-Encoding', 'gzip');
//
//             if (extensionFile === '.data' || extensionFile === '.mem') {
//                 res.set('Content-Type', 'application/octet-stream');
//             } else if (filename.includes("wasm")) {
//                 res.set('Content-Type', 'application/wasm');
//             } else {
//                 console.log(filename + " unprocessed");
//             }
//         }
//     }
//
//     res.sendFile(path.resolve(__dirname , '../dist/Build/' + filename));
// });

// For files with gzip
// //Serve static files
// app.use("/game", (req, res, next) => {console.log(req.originalUrl); next();}, expressStaticGzip(path.resolve(__dirname, '../dist')));

// Serve Public Files
app.use('/', express.static(path.resolve(__dirname, './public')));

app.listen(port);

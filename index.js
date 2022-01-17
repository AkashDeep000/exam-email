var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'akashdeep.me1@gmail.com',
        pass: '@hsakA321#'
    }
});



///////////////
///////////////////
///////////////////////
const express = require("express")
const app = express()
const cors = require("cors");
app.use(cors({
  origin: "*",
  allowedHeaders: ['Origin','X-Requested-With','Content-Type', 'Authorization'],
  maxAge: 864000,
   "preflightContinue": true,
}));
const fs = require("fs-extra")
const busboy = require("connect-busboy");   // Middleware to handle the file upload https://github.com/mscdex/connect-busboy
const uploadPath = './file/'; // Register the upload path
fs.ensureDir(uploadPath); // Make sure that he upload path exits
 
 
app.use(busboy({
    highWaterMark: 0.5 * 1024 * 1024, // Set 0.5MiB buffer
})); // Insert the busboy middle-ware


app.post('/upload', async (req, res, next) => {
   const apiTimeout = 10 * 60 * 1000;
  // Set the timeout for all HTTP requests
    req.setTimeout(apiTimeout, () => {
        let err = new Error('Request Timeout');
        err.status = 408;
        next(err);
    });
    // Set the server response timeout for all HTTP requests
    res.setTimeout(apiTimeout, () => {
        let err = new Error('Service Unavailable');
        err.status = 503;
        next(err);
    });
  
  
  req.pipe(req.busboy); 
  // Pipe it trough busboy
if (req.busboy) {
  let formData = new Map();
  req.busboy.on('field', function(fieldname, val) {
    formData.set(fieldname, val);
  });

  let filename;
  let path;
 req.busboy.on('file', (pdfFile, file, fileDetailClient) => {
   filename = fileDetailClient.filename
   console.log(fileDetailClient.filename)
   console.log(formData)
   path = `${uploadPath}-${Date.now()}-CC2-O2.pdf`
      /*  console.log(`Upload of '${filenameClient}' started`);
         filename = `${filenameClient.slice(0, -4).replace(/\s+/g, '-').replace(/[{(&$@<>?!%#*^)}]/g, '_')}-${Date.now()}`;
        // Create a write stream of the new file
        */
        const fstream = fs.createWriteStream(path);
        // Pipe it trough
        file.pipe(fstream);
 
        // On finish of the upload
fstream.on('close', () => {
  console.log(`Upload of '${filename}' finished`);
});
return true
});

req.busboy.on("finish", async () => {
  console.log("Fisished...")
  const name = formData.get('name') //  '600'
  const reg = formData.get('reg') //  'true'
  const roll = formData.get('roll') //  '50'
  const no = formData.get('no') //  '150'
  ///||||||//|2//////
  /////////Form Email
  const mailOptions = {
    from: `"${name}"akashdeep.me1@gmail.com`, // sender address
    to: 'akashdeepdas970@gmail.com', // list of receivers
    subject: `${name} CC-02 Answer Sheet`, // Subject line
    html: 
`<h2 align="center">${name} CC-02 Answer Sheet</h2>
<hr>
<h3>Name: ${name}</h3>
<h3>Regestration No: ${reg}</h3>
<h3>Roll: ${roll}</h3>
<h3>No: ${no}</h3>
`,
    attachments: [
        {   // utf-8 string as an attachment
            filename: `CC-02.pdf`,
            path: path,
        }
      ]
  };
 transporter.sendMail(mailOptions, function (err, info) {
    if(err) {
        console.log(err)
        res.send(err)
    }
    else {
        console.log(info);
        res.send(info)
    }
}) 
  
})
}
  
})
app.listen(5000,() => {
console.log("App is listening on Port 5000");
})

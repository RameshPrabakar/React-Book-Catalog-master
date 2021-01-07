const express = require("express");
const router = express.Router();
const booksController = require('../controller/books');
const Busboy = require('../node_modules/busboy');
const fs = require('fs');
const path = require('path');

router.get("/list", (req, res) => {
  booksController.getAll(req.body, (err, data) => {
    if (err) return res.send(err);
    res.send(data);
  });
});

router.post("/addNew", (req, res) => {
  try {
    const busboy = new Busboy({ headers: req.headers });
    let params = {};
    let fileDetails = {};
    busboy.on('field', (fieldname, val) => {
      params[fieldname] = val;
    });

    busboy.on('file', (fieldname, file, filename) => {
      let filePath = path.resolve(__dirname, '../../public/img/', filename);
      let fstream = fs.createWriteStream(filePath);

      file.pipe(fstream);
      fstream.on('close', () => {
        fileDetails = {
          status: 'success',
          path: filePath,
          filename: filename
        };
      });
    });

    busboy.on('error', () => {
      console.log('Error on file process');
    });

    busboy.on('finish', () => {
      booksController.addNewBook(params, (err, data) => {
        if (err) return res.send(err);

        res.send(data);
      });
    });

    req.pipe(busboy);

  }
  catch (error) {
    console.error(error);
  }

});

router.post("/delete", (req, res) => { 
  booksController.delete(req.body, (err, data) => {
    if (err) return res.send(err);
    res.send(data);
  });  
})

router.post("/update", (req, res) => {
  booksController.findAndUpdate(req.body, (err, data) => {
    if (err) return res.send(err);
    res.send(data);
  });
})
module.exports = router;

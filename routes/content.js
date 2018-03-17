const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const router = express.Router();
const multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var {Picture} = require('../models/picture');
var app = require('../server');

router.route('/')
//Upload new picture
.post( upload.single('image'), (req,res ) => {
    // create a new picture
    console.log(req.file.filename);
    req.file.filename = req.file.originalname;
    let path = req.file.path;
    let gallery_specific = req.body.gallery;
    var picture = new Picture({
    name : req.body.name,
    description : req.body.description,
    gallery : req.body.gallery,
    path : path.substring('public'.length)
  });
    console.log(gallery_specific);
    picture.save().then((doc) => {
    res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  })

//Get all the pictures
.get((req, res) => {
  Picture.find((e, pictures) => {
    if (e)
    res.send(e);
    res.json(pictures);
  });
})
//Delete existing picture
.delete((req, res) => {
  let name = req.body.name;
  console.log(name);
  let path = req.body.path;
  let fspath = "public" + path;
  Picture.remove({name: name}, function(e){
    console.log(name);
    console.log(path);
    console.log(fspath);
    if(e)
    res.send(e);
    res.json({message: path + 'deleted!'});
    fs.unlinkSync(fspath);
  })
});


module.exports = router;

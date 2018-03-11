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
//Delete existing picture
.delete((req, res) => {
  let name = req.body.name;
  console.log(name);
  let path = req.body.path;
  let fspath = "public/uploads/" + path;
  Picture.remove({name: name}, function(e){
    if(e)
    res.send(e);
    res.json({message: path + 'deleted!'});
    fs.unlinkSync(fspath);
  })
});



//Delete existing image
// .delete(function(req, res){
//
//   let dbname = req.body.dbname;
//   let id = req.body.id;
//   let rmpath = "public/uploads/" + dbname ;
//   picture.remove({dbname: dbname},function(err){
//     if(err)
//     res.send(err);
//     res.json({message:  dbname + ' deleted.'});
//     fs.unlinkSync(rmpath);
//   });
// });

//Find a picture//

// router.route('/:pictureId')
// .get(function(req, res){
//   picture.findById(req.params.pictureId, function(err, picture){
//       if (err)
//       res.send(err);
//     res.render('home.hbs',{
//       picture: picture.name,
//       path: picture.path,
//       description: picture.description
//     });
//   });
// });


module.exports = router;

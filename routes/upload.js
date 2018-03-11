const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const router = express.Router();
const multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var Picture = require('../models/picture');
//var app = require('../server');
var app = express();

app.post('/', upload.single('image'), (req,res ) => {
    // create a new picture
    console.log(req.file);
    var picture = new Picture();
    picture.name = req.body.name;
    picture.description = req.body.description;
    picture.originalname = req.file.originalname;
    picture.album = req.body.album;
    let path = req.file.path;
    console.log(path);
    picture.path = path.substring('public/'.length);
    console.log(picture.path);
    picture.dbname = req.file.filename ;

    picture.save(function(err){
      if(err)
      res.send(err);
      res.json({message: 'File ' + picture.originalname + ' uploaded as ' + picture.dbname + ' in location ' + picture.path });
    });
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

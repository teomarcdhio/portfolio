const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const router = express.Router();
const multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var {Picture} = require('../models/picture');
var app = require('../server');
ObjectId = require('mongodb').ObjectID;


router.route('/:gallery/:_id').get(async (req, res) => {
  try {
    const gallery = await Picture.findById(req.params._id).and({ gallery: req.params.gallery });
    console.log('id: ', gallery._id);
    const nextImage = await Picture.findById( { $gt: new ObjectId(gallery._id) } ).sort({ _id: 1 }).limit(1);
    const prevImage = await Picture.findById( { $lt: new ObjectId(gallery._id) } ).sort({ _id: -1 }).limit(1);
    //console.log('next image: ', nextImage._id);
    //console.log('prev image: ', prevImage._id);
    res.render('gallery.hbs',{
      galleryTitle: gallery.gallery,
      picName: gallery.name,
      path: gallery.path,
      picDescription: gallery.description,
      nextImg: nextImage._id,
      prevImg: prevImage._id
    });
  } catch(e) {
    console.log(e);
  }
});
// router.route('/:_id')
//   .get(function (req, res) {
//     let pictureObject;
//     //let curId = `ObjectId("${req.params._id}")`;
//     let curId = req.params._id;
//     Picture.findById(req.params._id)
//       .then(currentImg => {
//         pictureObject = {
//           gallery: currentImg.name,
//           path: currentImg.path,
//           description: currentImg.description
//         };
//         return Picture.find(({ _id: { $gt: new ObjectId(curId) } })).sort({ _id: 1 }).limit(1);
//         console.log(currentImg);
//       })
//       .then(nextImg => {
//         pictureObject.nextImg = nextImg._id;
//         return Picture.find(({ _id: { $lt: new ObjectId(curId) } })).sort({ _id: -1 }).limit(1);
//         console.log(nextImg);
//       })
//       .then(previousImg => {
//         pictureObject.previousImg = previousImg._id;
//         res.render('bandw.hbs', pictureObject);
//         console.log(pictureObject);
//       })
//       .catch(err => { console.log(err); });
//   });




module.exports = router;

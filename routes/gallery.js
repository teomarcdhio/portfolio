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
    const nextImage = await Picture.findById({ $gt: new ObjectId(gallery._id) }).and({ gallery: req.params.gallery }).sort({ _id: 1 }).limit(1);
    const prevImage = await Picture.findById({ $lt: new ObjectId(gallery._id) }).and({ gallery: req.params.gallery }).sort({ _id: -1 }).limit(1);
    //console.log('next image: ', nextImage._id);
    //console.log('prev image: ', prevImage._id);
    if (nextImage != null && prevImage === null) {
      console.log('render only nextImage');
      res.render('gallery.hbs',{
        pageTitle: gallery.gallery,
        galleryTitle: gallery.gallery,
        picName: gallery.name,
        path: gallery.path,
        picDescription: gallery.description,
        nextImg: nextImage._id,
        prevImg: gallery._id
      });
    } else if (nextImage === null && prevImage != null) {
      console.log("render only prevImage");
      res.render('gallery.hbs',{
        pageTitle: gallery.gallery,
        galleryTitle: gallery.gallery,
        picName: gallery.name,
        path: gallery.path,
        picDescription: gallery.description,
        nextImg: gallery._id,
        prevImg: prevImage._id
      });
    } else if ( nextImage && prevImage ) {
      console.log("render normally");
      res.render('gallery.hbs',{
        pageTitle: gallery.gallery,
        galleryTitle: gallery.gallery,
        picName: gallery.name,
        path: gallery.path,
        picDescription: gallery.description,
        nextImg: nextImage._id,
        prevImg: prevImage._id
      });
    } else {
      console.log("render without any option");
      res.render('gallery.hbs',{
        pageTitle: gallery.gallery,
        galleryTitle: gallery.gallery,
        picName: gallery.name,
        path: gallery.path,
        picDescription: gallery.description,
        nextImg: gallery._id,
        prevImg: gallery._id
      });
    };
  } catch(e) {
    console.log(e);
  }
});

module.exports = router;

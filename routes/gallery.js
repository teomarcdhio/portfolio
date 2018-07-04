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
    const firstColore = await Picture.findOne({"gallery": "Colore"}).sort({ _id: 1 }).limit(1);
    const firstBandw = await Picture.findOne({"gallery": "B&W"}).sort({ _id: 1 }).limit(1);
    const firstAudacity = await Picture.findOne({"gallery": "Audacity"}).sort({ _id: 1 }).limit(1);
    const firstCooling = await Picture.findOne({"gallery": "Cooling"}).sort({ _id: 1 }).limit(1);
    const firstKidz = await Picture.findOne({"gallery": "Kidz"}).sort({ _id: 1 }).limit(1);
    const firstMeetmeat = await Picture.findOne({"gallery": "Meetmeat"}).sort({ _id: 1 }).limit(1);
    const firstMuse = await Picture.findOne({"gallery": "Muse"}).sort({ _id: 1 }).limit(1);
    const firstSquatinn = await Picture.findOne({"gallery": "Squatinn"}).sort({ _id: 1 }).limit(1);
    const gallery = await Picture.findById(req.params._id).and({ gallery: req.params.gallery });
    console.log('id: ', gallery._id);
    const nextImage = await Picture.findById({ $gt: new ObjectId(gallery._id) }).and({ gallery: req.params.gallery }).sort({ _id: 1 }).limit(1);
    const prevImage = await Picture.findById({ $lt: new ObjectId(gallery._id) }).and({ gallery: req.params.gallery }).sort({ _id: -1 }).limit(1);
    //console.log('next image: ', nextImage._id);
    //console.log('prev image: ', prevImage._id);
    if (nextImage != null && prevImage === null) {
      console.log('render only nextImage');
      res.render('gallery.hbs',{
        firstColore: firstColore._id,
        firstBandw: firstBandw._id,
        firstAudacity: firstAudacity._id,
        firstCooling: firstCooling._id,
        firstKidz: firstKidz._id,
        firstMeetmeat: firstMeetmeat._id,
        firstMuse: firstMuse._id,
        firstSquatinn: firstSquatinn._id,
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
        firstColore: firstColore._id,
        firstBandw: firstBandw._id,
        firstAudacity: firstAudacity._id,
        firstCooling: firstCooling._id,
        firstKidz: firstKidz._id,
        firstMeetmeat: firstMeetmeat._id,
        firstMuse: firstMuse._id,
        firstSquatinn: firstSquatinn._id,
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
        firstColore: firstColore._id,
        firstBandw: firstBandw._id,
        firstAudacity: firstAudacity._id,
        firstCooling: firstCooling._id,
        firstKidz: firstKidz._id,
        firstMeetmeat: firstMeetmeat._id,
        firstMuse: firstMuse._id,
        firstSquatinn: firstSquatinn._id,
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
        firstColore: firstColore._id,
        firstBandw: firstBandw._id,
        firstAudacity: firstAudacity._id,
        firstCooling: firstCooling._id,
        firstKidz: firstKidz._id,
        firstMeetmeat: firstMeetmeat._id,
        firstMuse: firstMuse._id,
        firstSquatinn: firstSquatinn._id,
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

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const multer  = require('multer');
const bodyParser = require('body-parser');
var upload = multer({ dest: __dirname + '/public/uploads/' });
var app = express();
var { mongoose } = require('./db/mongoose.js');
var content = require('./routes/content');
var gallery = require('./routes/gallery');
var { Picture } = require('./models/picture');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const sendmail = require('sendmail')();



hbs.registerPartials(__dirname + '/views/partials');

app.set('view-engine', 'hbs');
app.use(express.static(__dirname + '/public'));
//Required static definition to use templates on different routes eg. /content or /gallery
app.use("/stylesheet",express.static(__dirname + "/stylesheets"));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json({limit:'50mb'})); //set file limit to 50 Mb
app.use(bodyParser.urlencoded({limit:'50mb', extended: false, parameterLimit:50000 }));//set file limit to 50 Mb

app.use('/content', content);

app.use('/gallery', gallery);

app.get('/', (async(req,res ) => {
  try{
    const firstColore = await Picture.findOne({"gallery": "Colore"}).sort({ _id: 1 }).limit(1);
    const firstBandw = await Picture.findOne({"gallery": "B&W"}).sort({ _id: 1 }).limit(1);
    const firstAudacity = await Picture.findOne({"gallery": "Audacity"}).sort({ _id: 1 }).limit(1);
    const firstCooling = await Picture.findOne({"gallery": "Cooling"}).sort({ _id: 1 }).limit(1);
    const firstKidz = await Picture.findOne({"gallery": "Kidz"}).sort({ _id: 1 }).limit(1);
    const firstMeetmeat = await Picture.findOne({"gallery": "Meetmeat"}).sort({ _id: 1 }).limit(1);
    const firstMuse = await Picture.findOne({"gallery": "Muse"}).sort({ _id: 1 }).limit(1);
    const firstSquatinn = await Picture.findOne({"gallery": "Squatinn"}).sort({ _id: 1 }).limit(1);
    console.log(firstColore._id);
    res.render('home.hbs',{
      pageTitle: 'The home page',
      welcomeMessage: 'Hey welcome you!',
      firstColore: firstColore._id,
      firstBandw: firstBandw._id,
      firstAudacity: firstAudacity._id,
      firstCooling: firstCooling._id,
      firstKidz: firstKidz._id,
      firstMeetmeat: firstMeetmeat._id,
      firstMuse: firstMuse._id,
      firstSquatinn: firstSquatinn._id,

    });
  }catch(e){
    console.log(e);
  };

}));

app.get('/contact', (req,res ) => {
  res.render('contact.hbs',{
    pageTitle: 'Contact page'
  });
});

app.post('/contact', (req, res) => {
  var name = req.body["name"];
  var mail = req.body["email"];
  var body = req.body["textarea"];
  if ( !mail) {
    res.render('contact.hbs',{
      pageTitle: 'Something went wrong'
    });
    return false;
  }
  sendmail({
  from: `${mail}`,
  to: 'mmarcolinionline@gmail.com',
  subject: 'Contact request from the website',
  html: `Contact form submission from ${name} @ ${mail} <br /> ${body}`
    }, function (err, reply) {
      console.log(err && err.stack)
      console.dir(reply)
    });
  res.render('contact.hbs',{
    pageTitle: 'Email sent'
  });
})

// app.post('/', upload.single('image'), (req,res ) => {
//     // create a new picture
//     console.log(req.file.filename);
//     req.file.filename = req.file.originalname;
//     let path = req.file.path;
//     var picture = new Picture({
//     name : req.body.name,
//     description : req.body.description,
//     gallery : req.body.gallery,
//     path : path.substring('public/'.length)
//   });
//
//     picture.save().then((doc) => {
//     res.send(doc);
//     }, (e) => {
//       res.status(400).send(e);
//     });
//   });


// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



app.listen(3000, () => {
  console.log('server is up on port 3000');
});

module.exports = app;

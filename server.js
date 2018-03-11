const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const router = express.Router();
const multer  = require('multer');
const bodyParser = require('body-parser');
var upload = multer({ dest: __dirname + '/public/uploads/' });
var app = express();
//var uploa = require('./routes/upload');
//var Gallery = require('./models/gallery');
var {mongoose} = require('./db/mongoose.js')
var {Picture} = require('./models/picture');

hbs.registerPartials(__dirname + '/views/partials');

app.set('view-engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json({limit:'50mb'})); //set file limit to 50 Mb
app.use(bodyParser.urlencoded({limit:'50mb', extended: false, parameterLimit:50000 }));//set file limit to 50 Mb

// app.use('/upload', upload);

app.get('/', (req,res ) => {
  res.render('home.hbs',{
    pageTitle: 'The home page',
    welcomeMessage: 'Hey welcome you!'
  });
});

app.get('/bandw', (req,res ) => {
  res.render('bandw.hbs',{
    pageTitle: 'black and white'
  });
});

app.post('/', upload.single('image'), (req,res ) => {
    // create a new picture
    console.log(req.file.filename);
    req.file.filename = req.file.originalname;
    let path = req.file.path;
    var picture = new Picture({
    name : req.body.name,
    description : req.body.description,
    gallery : req.body.gallery,
    path : path.substring('public/'.length)
  });

    picture.save().then((doc) => {
    res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });


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

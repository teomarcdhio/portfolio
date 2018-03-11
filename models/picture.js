var mongoose = require('mongoose');

var Picture = mongoose.model('Picture', {
  name: {
    type: String,
    reuired: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    reuired: true,
    minlength: 1,
    trim: true
  },
  gallery: {
    type: String,
    reuired: true,
    minlength: 1,
    trim: true
  },
  path: {
    type: String,
    minlength: 1,
    trim: true
  }
});

module.exports = {Picture: Picture};

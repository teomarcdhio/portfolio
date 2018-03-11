var mongoose = require('mongoose');

var Gallery = mongoose.model('Gallery', {
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
  path: {
    type: String,
    reuired: true,
    minlength: 1,
    trim: true
  },
});

module.exports = {Gallery: Gallery};

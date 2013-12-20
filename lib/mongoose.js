var mongoose = require('mongoose');
var config = require('../config');

var uristring =
    process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        config.get('mongoose:uri');
mongoose.connect(uristring,config.get('mongoose:options'));
module.exports = mongoose;
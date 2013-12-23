
/*
 * GET users listing.
 */

exports.friends = function(req, res){
  var User = require('../models/user').User;
  User.find({}, function(err,friends){
     res.render('friends', {title: "friends", friends: friends });
  })
};
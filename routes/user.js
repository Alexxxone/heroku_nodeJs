
/*
 * GET users listing.
 */

exports.friends = function(req, res){

  console.log('ROUTER');
  var User = require('../models/user').User;
  User.findOne({email: 'ba@mail.ru'}, function(err,friends){
     console.log(friends);
     res.render('friends', {title: "friends", friends: friends });
  })
};
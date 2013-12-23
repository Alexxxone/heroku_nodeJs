
/*
 * GET users listing.
 */
var request = require("request");

exports.friends = function(req, res){

    request({
        uri: "http://alexxxxone-backend.herokuapp.com/house.json",
        method: 'GET',
        json: true
    }, function(error, response, body) {

       res.render('friends', {title: "friends", friends: body});



    });

//    var User = require('../models/user').User;
//  User.find({}, function(err,friends){
//     res.render('friends', {title: "friends", friends: friends });
//  })
};
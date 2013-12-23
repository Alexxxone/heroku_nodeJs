var User = require('./models/user').User;

var user = new User({
    username: 'Tester',
    email: 'b@mail.ru',
    password: 'secret'
});

user.save(function(err, user, affected){
    if(err) throw err;
   User.findOne({email: 'b@mail.ru'}, function(err,tester){
       console.log(tester);
   })
});
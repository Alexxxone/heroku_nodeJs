var User = require('./models/user').User;

var user = new User({
    username: 'Tester2',
    email: 'ba@mail.ru',
    password: 'secret'
});

user.save(function(err, user, affected){
    if(err) throw err;
   User.findOne({email: 'ba@mail.ru'}, function(err,tester){
       console.log(tester);
   })
});
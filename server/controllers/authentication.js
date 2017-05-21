const User = require('../models/user');

exports.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // User.findOne({ email }, function(err, existingUser) {
  //   if (err) { return next(err); }
  //   console.log(existingUser)
  //   if (existingUser) {
  //     return res.status(422).send({ error: 'Email is in use' });
  //   }
  //
  //   const user = new User({
  //     email,
  //     password
  //   });
  //
  //   user.save()
  //     .then(newUser => {
  //       res.json(user);
  //     })
  //     .catch(err => {
  //       return next(err)
  //     });
  // });

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        res.status(422).send({ error: 'Email is in use' });
      }

      const user = new User({ email, password });

      user.save()
        .then(newUser => {
          res.json({ success: true });
        })
        .catch(err => {
          return next(err)
        });
    })
    .catch(err => {
      return next(err);
    })
}

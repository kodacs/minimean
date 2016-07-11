var express = require('express')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var router = express.Router()
var crypto = require('crypto')

router.route('/')
  .get(function (req, res) {
    res.json({
      "message": "auth"
    })
  })
  .post(function (req, res) {
    User.findOne({
      name: req.body.name
    }, function (err, user) {
      if (err) {
        throw err
      }
      if (!user) {
        res.json({ success: false, message: 'Authentication failed.' });
      } else if (user) {
        crypto.pbkdf2(req.body.password, user.salt, 10000, 128, 'sha512', function (err, hash) {
          var hashedPW = hash.toString('hex')
          if (hashedPW != user.passwordHash) {
            res.json({ success: false, message: 'Authentication failed.' });
          } else {
            var token = jwt.sign(user, app.get('signingkey'), {
              expiresIn: '15m'
            })
          }
        })
      }
    })
  })

module.exports = router

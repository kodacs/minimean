var express = require('express')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var router = express.Router()
var crypto = require('crypto')

//authentication
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
        res.json({ success: false, message: 'Authentication failed.' })
      } else if (user) {
        crypto.pbkdf2(req.body.password, user.salt, 10000, 128, 'sha512', function (err, hash) {
          var hashedPW = hash.toString('hex')
          if (hashedPW != user.passwordHash) {
            res.json({ success: false, message: 'Authentication failed.' })
          } else {
            var token = jwt.sign(user, app.get('signingkey'), {
              expiresIn: '10h'
            })
          }
        })
      }
    })
  })

//setup default user for initial login; you don't want to be locked out, huh?
router.route('/setup')
  .get(function (req, res) {
    User.findOne({
      name: "defaultuser"
    }, function (err, user) {
      if (err) {
        throw err
      }
      if (!user) {
        var nick = new User({
          name: 'defaultuser',
          salt: 'Y2SXrtUvGN4tU3UUEjXOKN0qLD50j3vbYh0QPYYsaFSvSEYDvgo8LizgpYqmCMcR9k'
           + '+BFWfD/9P5McvDv84ihWVhe5DG9pPI3sqiJ+shcVCjmAyMlI4VjoX76Vrxfl+wFWkRkpV'
           + 'w4CUiSdXyt9BsHUfmYDuSeOKY2YvqQf0hN2Q=',
           //password = reparetekmogyoro
          passwordHash: '84692065b44c7ced327c1d5e63204aaa254f695c192aa8d03393ec4aed'
           + '005247fe5a1812290c9a763f444eed4e506046bc1c4dbbc07c72a6931ca3872569f35'
           + '6e5e7aef41487ea7c037deff02dbe8967e7e0194e662c6140a8b904afd6916651b0ae'
           + '965f9c67381cf709dd0774a1b1b29b5212102129942ef73ab825efd81347',
          admin: true
        })
      } else {
        user.salt = 'Y2SXrtUvGN4tU3UUEjXOKN0qLD50j3vbYh0QPYYsaFSvSEYDvgo8LizgpYqmCMcR9k'
               + '+BFWfD/9P5McvDv84ihWVhe5DG9pPI3sqiJ+shcVCjmAyMlI4VjoX76Vrxfl+wFWkRkpV'
               + 'w4CUiSdXyt9BsHUfmYDuSeOKY2YvqQf0hN2Q='
        user.passwordHash = '84692065b44c7ced327c1d5e63204aaa254f695c192aa8d03393ec4aed'
               + '005247fe5a1812290c9a763f444eed4e506046bc1c4dbbc07c72a6931ca3872569f35'
               + '6e5e7aef41487ea7c037deff02dbe8967e7e0194e662c6140a8b904afd6916651b0ae'
               + '965f9c67381cf709dd0774a1b1b29b5212102129942ef73ab825efd81347'
        user.admin = true
        user.save(function(err){
          if (err) {
            res.send(err)
          } else {
            res.json({
              message: "RESET!!!"
            })
          }
        })
      }
    })
  })


module.exports = router

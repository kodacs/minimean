var express = require('express')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var router = express.Router()
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var signingkey = process.env.npm_package_config_secretkey


//authentication
router.route('/')
  // check all the tokens!
  .get(function (req, res) {
    var token = req.body.token ||
                req.query.token ||
                req.headers['x-access-token']
    if (token) {
      jwt.verify(token, signingkey, function (err, decoded) {
        if (err) { //bad token
          res.json({ authenticated: false, message: 'Invalid token.' })
        } else { //valid, go on, then return some user data
          res.send( JSON.stringify({'authenticated': true,
                                    'name': decoded._doc.name,
                                    'admin' : decoded._doc.admin}))
        }
      })
    } else { //without token :(
      res.json({ authenticated: false, message: 'Missing token.' })
    }
  })
//actual login, token
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
//crypto... "is almost orgasmic" https://youtu.be/M3iOROuTuMA?t=23s
        crypto.pbkdf2(req.body.password, user.salt, 10000, 128, 'sha512', function (err, hash) {
          var hashedPW = hash.toString('hex')
          if (hashedPW != user.passwordHash) {
            res.json({ success: false, message: 'Authentication failed.' })
          } else {
            var token = jwt.sign(user, signingkey, {
              expiresIn: '10h'
            })
            res.json({ success: true, token: token})
          }
        })
      }
    })
  })

//setup route default user for initial login; you don't want to be locked out, huh?
router.route('/setup')
  .get(function (req, res) {
    User.findOne({
      name: "defaultuser"
    }, function (err, user) {
      if (err) {
        throw err
      }
      if (!user) { //if there isn't a defaultuser we create it.
        var user = new User({
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
        user.save(function(err){
          if (err) {
            res.send(err)
          } else {
            res.json({
              message: "INITALIZED!!!"
            })
          }
        })
      } else { //if there exists a defaultuser we resetting its PW
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
              message: "RESETED!!!"
            })
          }
        })
      }
    })
  })

module.exports = router

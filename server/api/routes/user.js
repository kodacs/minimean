var express = require('express')
var mongoose = require('mongoose')
var crypto = require('crypto')

var User = mongoose.model('User')
var router = express.Router()

var checkAuth = require('../checkauth_mw')

router.use(checkAuth)
router.route('/')
  .get(function (req, res) {
    User.find(function (err, users) {
      if (err) {
        res.send(err)
      } else {
        res.json(users)
      }
    })
  })
  .post(function (req, res) {
    var salt = crypto.randomBytes(128).toString("base64")
    var user = new User()
    user.name = req.body.name
    user.admin = false
    crypto.pbkdf2(req.body.password, salt, 10000, 128, 'sha512', function (err, hash) {
      if (err) {
        res.send(err)
      } else {
        user.salt = salt
        user.passwordHash = hash.toString('hex')
        user.save(function (err) {
          if (err) {
            res.send(err)
          } else {
            res.json({ message: 'User created!' })
          }
        })
      }
    })
  })

//another route when you give the _id
router.route('/:user_id')
  .get(function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
      if (err) {
        res.send(err)
      } else {
        res.json(user)
      }
    })
  })
//Yup, that is the all-famous callback hell.
  .put(function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
      if (err) {
        res.send(err)
      } else {
        if (req.body.password) {
          var salt = crypto.randomBytes(128).toString("base64")
          crypto.pbkdf2(req.body.password, salt, 10000, 128, 'sha512', function (err, hash) {
            if (err) {
              res.send(err)
            } else {
              user.passwordHash = hash.toString('hex')
              user.salt = salt
              if (req.body.name) { user.name = req.body.name }
              user.save(function (err) {
                if (err) {
                  res.send(err)
                } else {
                  res.json({ message: 'User modified! (pw changed)' })
                }
              })
            }
          })
        } else if (req.body.name) {
          user.name = req.body.name
          user.save(function (err) {
            if (err) {
              res.send(err)
            } else {
              res.json({ message: 'User modified!' })
            }
          })
        } else {
          res.json({ message: 'User not changed!' })
        }
      }
    })
  })
  .delete(function (req, res) {
    User.remove({_id: req.params.user_id}, function(err, user) {
      if (err) {
        res.send(err)
      } else {
        res.json({ message: 'Successfully deleted!'})
      }
    })
  })

module.exports = router

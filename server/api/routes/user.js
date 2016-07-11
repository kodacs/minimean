var express = require('express')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var router = express.Router()
var checkAuth = require('../checkauth_mw')

router.use(checkAuth)
router.route('/')
  .get(function (req, res) {
    res.json({
      "message": "get"
    })
  })

module.exports = router

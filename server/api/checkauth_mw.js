var express = require('express')
var jwt = require('jsonwebtoken')
var signingkey = process.env.npm_package_config_secretkey

module.exports = function(req, res, next) {
  var token = req.body.token  ||
              req.query.token ||
              req.headers['x-access-token']
  if (token) {
    jwt.verify(token, signingkey, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' })
      } else {
        req.decoded = decoded;
        console.log(decoded)
        return next()
      }
    })
  } else {
    return res.json({ success: false, message: 'Missing token.' })
  }
}

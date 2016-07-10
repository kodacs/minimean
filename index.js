//main file

var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var logger = require('morgan')
var crypto      = require('crypto')
var jwt    = require('jsonwebtoken')

//init
var app = express()

var port = process.env.npm_package_config_port || 8080

//db
mongoose.connect(process.env.npm_package_config_database)

//middleware
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));
app.set('signingkey', process.env.npm_package_config_secretkey)




app.listen(port);
console.log('Magic happens at http://localhost:' + port)

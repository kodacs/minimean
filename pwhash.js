//Its just a separate file to generate hashes to the pw and salt fields
//Usage: node pwhash.js <password> [salt]
var crypto = require('crypto')
var salt = process.argv[3] || crypto.randomBytes(128).toString("base64")

crypto.pbkdf2(process.argv[2], salt, 10000, 128, 'sha512', function (err, hash) {
    console.log("Salt: " + salt + "\n\n" + "PasswordHash: " + hash.toString('hex'))
})

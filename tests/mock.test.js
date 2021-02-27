
var SHA256 = require("crypto-js/sha256")
var CryptoJS = require("crypto-js")
var SECRET_KEY = 'x]vf4yp0yf'
var index = "1"
var previousHash = "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7"
var timestamp = Date.now()
var dataIsEdit = { info: 'Data is edit' }
var dataHash = CryptoJS.AES.encrypt(JSON.stringify(dataIsEdit), SECRET_KEY).toString()
var hash = SHA256(index + previousHash + timestamp + dataHash).toString()
console.log("timestamp: ", timestamp)
console.log("Data: ", dataIsEdit)
console.log("Data hash: ", dataHash)
console.log("Hash: ", hash)

var SHA256 = require("crypto-js/sha256");
var index = "1"
var previousHash = "e2676fb3fc20be08393274fab0e8651219e4a5b047574eab285bbb3b08a1f8dc"
var timestamp = 1606550255568
const data = "U2FsdGVkX186qidZnXoqGejoNwC37T3FbsRkIW9iXw761cBnkmNo3+9QP65D6upOEnohGGJDMr0lBpQ/SwCujQuMmwd/78L6jGbVSKxPwbUeZAQbpTETmwrH0v3g0852Ds6SdQnp3fuGlOzaX5pFGx7lA5zdt+10WgYWzbJ1N0M="
console.log(SHA256(index + previousHash + timestamp + data).toString())
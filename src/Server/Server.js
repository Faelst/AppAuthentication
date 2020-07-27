
const express = require('express')
const server = express()
const router = express.Router();
const port =  process.env.PORT || 8080;
const cors = require('..\\Config\\Cors.js')

server.use(cors)
server.listen(port ,() => console.log(`http://177.126.240.61:${port}`))
server.use('/api' , router)

module.exports = router
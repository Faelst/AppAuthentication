
const express = require('express')
const server = express()
const router = express.Router();
const port =  process.env.PORT || 3030;

// server.use(cors)
server.listen(port ,() => console.log(`http://10.16.128.109:${port}`))
server.use('/api' , router)

module.exports = router
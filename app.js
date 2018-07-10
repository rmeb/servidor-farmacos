const express = require('express')
const cors = require('cors')
const package = require('./package.json')
const logger = require('./utils/Logger')

const app = express()

app.use(cors())
app.get('/', (req, res) => res.send({
    "name": package.name,
    "version": package.version
}))

var port = process.env.PORT || 4000
//app.listen(port, () => logger.info(package.name + '-' + package.version +  ' listening on port ' + port))
app.listen(port, () => logger.info({server: package.name, version: package.version, port: port, status: 'listening'}))

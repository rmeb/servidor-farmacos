const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const package = require('./package.json')
const logger = require('./utils/Logger')

const {getFarmaco, searchFarmaco, createFarmaco, updateFarmaco} = require('./api/Farmacos')
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => res.send({
    "name": package.name,
    "version": package.version
}))

app.get('/farmaco/:codigo', getFarmaco)
app.get('/farmaco', searchFarmaco)
app.post('/farmaco', createFarmaco)
app.put('/farmaco', updateFarmaco)

var port = process.env.PORT || 4000
//app.listen(port, () => logger.info(package.name + '-' + package.version +  ' listening on port ' + port))
app.listen(port, () => logger.info({server: package.name, version: package.version, port: port, status: 'listening'}))

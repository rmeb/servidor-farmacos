const {success, fail, error} = require('../utils/Reply')
const logger = require('../utils/Logger')
const db = require('../db/Postgresql')

const GET_FARMACO = 'SELECT codigo, dci, forma_farmaceutica, concentracion_valor, concentracion_unidad, es_restringido FROM farmacos WHERE codigo = $1'

function getFarmaco(req, res) {
  let codigo = parseInt(req.params.codigo, 10)
  logger.info('[Farmacos.getFarmaco]' + codigo)

  if (isNaN(codigo)) {
    return fail(res, 'Parameter missing or invalid')
  }

  db.query(GET_FARMACO, [codigo]).then(result => {
    if (result.rows.length === 0) {
      return fail(res, 'Farmaco not found', 404)
    }
    success(res, result.rows[0])
  })
}

module.exports = {
  getFarmaco
}

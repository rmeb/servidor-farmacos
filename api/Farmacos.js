const {success, fail, error} = require('../utils/Reply')
const logger = require('../utils/Logger')
const db = require('../db/Postgresql')

const GET_FARMACO = 'SELECT codigo, dci, forma_farmaceutica, concentracion_valor, concentracion_unidad, es_restringido FROM farmacos WHERE codigo = $1'
const SEARCH_FARMACO = "SELECT codigo, dci FROM farmacos WHERE dci LIKE '%' || $1 || '%'"

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
    logger.info('[Farmacos.searchFarmaco] Farmaco encontrado.')
    success(res, result.rows[0])
  }).catch(e => {
    logger.error({code: e.code, detail: e.detail, message: '[Farmacos.getFarmaco] Error en query GET_FARMACO'})
    error(res, 'Internal error')
  })
}

function searchFarmaco(req, res) {
  let filter = req.query.q
  logger.info('[Farmacos.searchFarmaco]' + filter)

  if (!filter || filter.length === 0) {
    return fail(res, 'Parameter missing or invalid')
  }

  db.query(SEARCH_FARMACO, [filter.trim()]).then(result => {
    logger.info('[Farmacos.searchFarmaco] encontrados ' + result.rows.length)
    success(res, result.rows)
  }).catch(e => {
    logger.error({code: e.code, detail: e.detail, message: '[Farmacos.searchFarmaco] Error en query SEARCH_FARMACO'})
    error(res, 'Internal error')
  })
}

module.exports = {
  getFarmaco, searchFarmaco
}

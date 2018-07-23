const {success, fail, error} = require('../utils/Reply')
const logger = require('../utils/Logger')
const db = require('../db/Postgresql')
const fetch = require('node-fetch')

const ORACLE_API = 'https://restringidos-oracle.herokuapp.com'

const GET_FARMACO = 'SELECT codigo, dci, forma_farmaceutica, concentracion_valor, concentracion_unidad, es_restringido FROM farmacos WHERE codigo = $1'
const SEARCH_FARMACO = "SELECT codigo, dci FROM farmacos WHERE dci LIKE '%' || $1 || '%'"
const INSERT_FARMACO = 'INSERT INTO farmacos (codigo, dci, forma_farmaceutica, concentracion_valor, concentracion_unidad) values ($1, $2, $3, $4, $5)'
const UPDATE_FARMACO = 'UPDATE farmacos SET dci = $2, forma_farmaceutica = $3, concentracion_valor = $4, concentracion_unidad = $5 WHERE codigo = $1'

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

function createFarmaco(req, res) {
  let {codigo, dci, forma_farmaceutica,
    concentracion_valor, concentracion_unidad, es_restringido} = req.body

  console.log(req.body)
  logger.info('[Farmacos.createFarmaco]')

  if (isNaN(codigo)) {
    return fail(res, 'Parameter missing or invalid')
  }
  if (!valid(dci)) {
    return fail(res, 'Parameter missing or invalid')
  }
  if (!valid(forma_farmaceutica)) {
    return fail(res, 'Parameter missing or invalid')
  }
  if (isNaN(concentracion_valor)) {
    return fail(res, 'Parameter missing or invalid')
  }
  if (!valid(concentracion_unidad)) {
    return fail(res, 'Parameter missing or invalid')
  }
  if (es_restringido === undefined) {
    return fail(res, 'Parameter missing or invalid')
  }

  db.query(INSERT_FARMACO, [codigo, dci, forma_farmaceutica, concentracion_valor, concentracion_unidad]).then(result => {
    return fetch(ORACLE_API + '/actualizar', {
      method: 'POST',
      body: JSON.stringify({codigo, restringido: es_restringido}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }).then(r => r.json()).then(response => {
    if (response.status === 'success') {
      success(res, response.data.txHash)
    } else {
      error(res, response.data)
    }
  }).catch(e => {
    logger.error('[Farmacos.createFarmaco] ' + e.code + '::' + e.detail)
    if (e.code === '23505') {
      return fail(res, 'El codigo medicamento ingresado ya existe')
    }
    error(res, 'Error interno')
  })
}

function updateFarmaco(req, res) {
  let {codigo, dci, forma_farmaceutica,
    concentracion_valor, concentracion_unidad, es_restringido} = req.body

  console.log(req.body)
  logger.info('[Farmacos.createFarmaco]')

  if (isNaN(codigo)) {
    return fail(res, 'Parameter missing or invalid')
  }
  if (!valid(dci)) {
    return fail(res, 'Parameter missing or invalid')
  }
  if (!valid(forma_farmaceutica)) {
    return fail(res, 'Parameter missing or invalid')
  }
  if (isNaN(concentracion_valor)) {
    return fail(res, 'Parameter missing or invalid')
  }
  if (!valid(concentracion_unidad)) {
    return fail(res, 'Parameter missing or invalid')
  }
  if (es_restringido === undefined) {
    return fail(res, 'Parameter missing or invalid')
  }

  db.query(UPDATE_FARMACO, [codigo, dci, forma_farmaceutica, concentracion_valor, concentracion_unidad]).then(result => {
    return fetch(ORACLE_API + '/actualizar', {
      method: 'POST',
      body: JSON.stringify({codigo, restringido: es_restringido}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }).then(r => r.json()).then(response => {
    if (response.status === 'success') {
      success(res, response.data.txHash)
    } else {
      error(res, response.data)
    }
  }).catch(e => {
    logger.error('[Farmacos.createFarmaco] ' + e.code + '::' + e.detail)
    error(res, 'Error interno')
  })
}

function valid(v) {
  return v && v.length !== 0
}

module.exports = {
  getFarmaco, searchFarmaco, createFarmaco, updateFarmaco
}

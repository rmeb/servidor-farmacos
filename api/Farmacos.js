const {success, fail, error} = require('../utils/Reply')
const logger = require('../utils/Logger')

const DRUGS = [{
  CENS_ID: 6663524,
  DCI: 'aciclovir',
  FORMA_FARMACEUTICA: 'comprimido',
  CONCENTRACION_UNIDAD: 'mg',
  CONCENTRACION_VALOR: 400,
  ES_RESTRINGIDO: 'no',
  DESCRIPCION_PROD_COMERCIAL: 'aciclovir 400 mg comprimido (Mintlab)'
}, {
  CENS_ID: 120123,
  DCI: 'sertralina',
  FORMA_FARMACEUTICA: 'comprimido',
  CONCENTRACION_UNIDAD: 'mg',
  CONCENTRACION_VALOR: 50,
  ES_RESTRINGIDO: 'no',
  DESCRIPCION_PROD_COMERCIAL: 'altruline 50 mg comprimido recubierto (Roerig)'
}, {
  CENS_ID: 6619658,
  DCI: 'fentermina',
  FORMA_FARMACEUTICA: 'cápsula',
  CONCENTRACION_UNIDAD: 'mg',
  CONCENTRACION_VALOR: 37.5,
  ES_RESTRINGIDO: 'si',
  DESCRIPCION_PROD_COMERCIAL: 'sentis 37,5 mg cápsula (Lab Chile)'
}]

function getFarmaco(req, res) {
  let codigo = parseInt(req.params.codigo, 10)
  logger.info('[Farmacos.getFarmaco]' + codigo)

  if (isNaN(codigo)) {
    return fail(res, 'Parameter missing or invalid')
  }

  let drug = DRUGS.find(d => d.CENS_ID === codigo)

  if (drug) {
    success(res, drug)
  } else {
    fail(res, 'Farmaco not found', 404)
  }
}

module.exports = {
  getFarmaco
}

# servidor-farmacos
Servidor de Farmacos

## Descripcion
El servidor de farmacos es un servidor que permite guardar los datos de los farmacos que pueden ser recetados.

Los datos de cada farmaco son:

|  Campo               | Tipo    | Descripcion                                                           |
|----------------------|---------|-----------------------------------------------------------------------|
| CODIGO_MEDICAMENTO   | Numero  | Codigo unico del medicamento en el sistema                            |
| DCI                  | Texto   | Denominación Comun Internacional. Ej: Aciclovir                       |
| FORMA_FARMACEUTICA   | Texto   | Forma Farmaceutica. Ejemplo: comprimido, capsula, jarabe o inyectable |
| CONCENTRACION_VALOR  | Numero  | Valor de la concentracion. Ej. 400                                    |
| CONCENTRACION_UNIDAD | Numero  | Unidad de la concentraracion. Ej. mg, g, ml.                          |

## API Description

### Recuperar un fármaco

`GET /farmaco/<codigo>`

Permite recuperar un farmaco guardado

#### Response

| Status |     Message    |                               |
|:------:|----------------|-------------------------------|
| 200    | Ok.            | Farmaco recuperado            |
| 400    | Bad Request    | Parameter missing or invalid  |
| 404    | Not found      | Farmaco not found             |
| 500    | Internal Error | Internal error                |

#### Response data
```
{
  codigo: <codigo de farmaco>,
  dci: <dci del farmaco>,
  forma_farmaceutica: <comprimido, capsula, etc>,
  concentracion_valor: <valor de la concentracion>,
  concentracion_unidad: <unidad de la concetracion>
}
```

### Buscar un fármaco

`GET /farmaco?q=<search string>`

Permite buscar una lista de farmacos. El `<search string>` corresponde al texto a buscar
dentro del campo `dci`. La busqueda no es sensitiva a las mayusculas/minusculas. 

#### Response

| Status |     Message    |                               |
|:------:|----------------|-------------------------------|
| 200    | Ok.            | Farmacos encontrados          |
| 400    | Bad Request    | Parameter missing or invalid  |
| 500    | Internal Error | Internal error                |

#### Response data
```
[
  { codigo: <codigo de farmaco>, dci: <dci del farmaco> },
  { codigo: <codigo de farmaco>, dci: <dci del farmaco> },
  { codigo: <codigo de farmaco>, dci: <dci del farmaco> },
  ...
  { codigo: <codigo de farmaco>, dci: <dci del farmaco> }
]
```


## Archivo de carga

El archivo de carga permite procesar un conjunto de farmacos. Aparte de cargarlos en su base de datos, procesa los restringidos contra el oraculo de restringidos.

El formato de cada linea del archivo de carga es el siguiente:

|  Campo               | Tipo    | Descripcion                                                           |
|----------------------|---------|-----------------------------------------------------------------------|
| CODIGO_MEDICAMENTO   | Numero  | Codigo unico del medicamento en el sistema                            |
| DCI                  | Texto   | Denominación Comun Internacional. Ej: Aciclovir                       |
| FORMA_FARMACEUTICA   | Texto   | Forma Farmaceutica. Ejemplo: comprimido, capsula, jarabe o inyectable |
| CONCENTRACION_VALOR  | Numero  | Valor de la concentracion. Ej. 400                                    |
| CONCENTRACION_UNIDAD | Numero  | Unidad de la concentraracion. Ej. mg, g, ml.                          |
| ES_RESTRINGIDO       | Binario | Indicador de la condicion de restringido del fármaco                  |



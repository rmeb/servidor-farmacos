# servidor-farmacos
Servidor de Farmacos

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



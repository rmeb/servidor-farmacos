CREATE TABLE farmacos (
  codigo INTEGER PRIMARY KEY,
  dci TEXT NOT NULL,
  forma_farmaceutica TEXT NOT NULL,
  concentracion_valor FLOAT NOT NULL,
  concentracion_unidad TEXT NOT NULL,
  es_restringido BOOLEAN NOT NULL
);

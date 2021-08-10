Curso Práctico de Node.js
Platzi course 2021
Carlos Hernández
Ref: https://github.com/CodingCarlos/proyecto-backend-node-platzi

express
JWT, jsonwebtoken
bcrypt
nanoid
custom manage error with THROW
Middlewares and next() functions
https://remotemysql.com/

Database
    Array mock 
    mysql

-./utils/error.js: Este se encarga de generar un nuevo error dentro de nuestra api. Ej: en registrar nuevo usuario si falta el parámetro username generamos un nuevo error con esta utilidad.

-./network/errors.js: Este es un middleware que se va a encargar de capturar todos los errores que hayamos generados en el api.

Al ser un middleware lo trabaja separado de lo que es la lógica del response, cada vez que se genera el error con throw error() debemos llamar a next() dentro del catch de la promesa para que el middleware maneje ese error.

mysql script test data:
CREATE TABLE user(
  id        VARCHAR(32) NOT NULL,
  username  VARCHAR(32),
  `name`      VARCHAR(64),
   PRIMARY KEY (id)
);

INSERT INTO user (id, username, `name`) VALUES (1,'usuarioPrueba', 'Nombre usuarioPrueba');
commit;


CREATE TABLE auth(
  id        VARCHAR(32) NOT NULL,
  username  VARCHAR(32),
  password  VARCHAR(64),
  PRIMARY KEY (id)
);

CREATE TABLE  user_follow(
  user_from   VARCHAR(32),
  user_to     VARCHAR(32),
  unique index  (user_from, user_to)
);

CREATE TABLE  post(
  id  VARCHAR(32),
  text  VARCHAR(4000),
  user  VARCHAR(32),
  PRIMARY KEY (id)
);


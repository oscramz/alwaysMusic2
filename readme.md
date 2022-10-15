Para poder hacer uso de la app es necesario realizar un paso previo.

1.- En la consola se debe ejecutar el siguiente comando "npm i pg" para poder instalar la libreria PG y realizar las conexiones nativas con la db.

Realizado la anterior se puede hacer uso de la app.

1.- Para crear un nuevo estudiante en la DB se utiliza la siguiente estructura ingresada en la consola - node alwaysMusic.js crear "23.658.698-5" "Pedro Picapiedra" Violin 8.

2.- Para realizar una consulta general se ingresa - node alwaysMusic.js general.

3-. Para consultar por el Rut se ingresa - node alwaysMusic.js rut "25.698.639-2".

4.- Para actualizar un estudiante se ingresan los valores con los cambios requeridos en los campos correspondientes - node alwaysMusic.js actualizar "25.698.639-2" "Pedro Picapiedra" Violin 8.

5.- Para eliminar un estudiante se ingresa - node alwaysMusic.js eliminar "25.698.639-2"

Nota: la estructura para ingresar por la linea de comandos es la siguiente: node alwaysMusic.js (funcion) "rut" "nombre" curso nivel

Las funciones disponibles son:

- Crear: Crea un nuevo registro.
- General: Realiza una consulta general a la db.
- Rut: Realiza una busqueda por el rut ingresado.
- Actualizar: Permite editar los campos en el registro de la db.
- Eliminar: Elimina un registro según el rut ingresado.

create database alwaysMusic

CREATE TABLE estudiantes (
rut varchar(12) PRIMARY KEY,
nombre varchar(50),
curso varchar(20),
nivel int
)

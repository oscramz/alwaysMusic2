const { Client } = require("pg");

const config = {
  user: "postgres",
  host: "localhost",
  database: "always_music",
  password: "postgre",
  port: 5432,
};

const client = new Client(config);

client.connect();

let argumentos = process.argv.slice(2);
let funcion = argumentos[0];
let rut1 = argumentos[1];
let nombre1 = argumentos[2];
let curso1 = argumentos[3];
let nivel1 = argumentos[4];

const nuevoEstudiante = async (rut, nombre, curso, nivel) => {
  try {
    const respuesta = await client.query(
      `INSERT INTO estudiantes(rut, nombre, curso, nivel) VALUES('${rut}', '${nombre}', '${curso}', '${nivel}') RETURNING *`
    );
    console.log("Registros afectados: " + respuesta.rowCount);
    console.table(respuesta.rows);
    client.end();
    return "Registro insertado con éxito con id: " + respuesta.rows[0].id;
  } catch (error) {
    client.end();
    console.log(error);
  }
};

const consultaEstudiantes = async () => {
  try {
    const resultado = await client.query(
      "SELECT * FROM estudiantes order by rut"
    );
    console.table(resultado.rows);
    client.end();
    return resultado.rows;
  } catch (error) {
    client.end();
    console.log(error.code);
  }
};

const consultaRut = async (rut) => {
  try {
    const resultado = await client.query(
      `SELECT * FROM estudiantes WHERE rut = '${rut}'`
    );
    console.table(resultado.rows);
    client.end();
    return resultado.rows;
  } catch (error) {
    client.end();
    console.log(error.code);
  }
};

const actualizarEstudiante = async (rut, nombre, curso, nivel) => {
  try {
    const resultado = await client.query(
      `UPDATE estudiantes SET nombre = '${nombre}', curso = '${curso}', nivel = '${nivel}' WHERE rut = '${rut}' RETURNING *`
    );
    console.log("Registros afectados: " + resultado.rowCount);
    // console.log("Campos: ", resultado.fields);
    console.table(resultado.rows);
  } catch (error) {
    console.log(error.code);
  }
  client.end();
};

const eliminarEstudiante = async (rut) => {
  try {
    const resultado = await client.query(
      `DELETE FROM estudiantes WHERE rut = '${rut}' RETURNING *`
    );
    console.log("Registros afectados: " + resultado.rowCount);
    console.table(resultado.rows);
  } catch (error) {
    console.log(error.code);
  }
  client.end();
};

// activacion de funciones
switch (funcion) {
  case "crear":
    nuevoEstudiante(rut1, nombre1, curso1, nivel1);
    console.log("Estudiante agregado con éxito");
    break;
  case "general":
    consultaEstudiantes();
    console.log("Consulta realizada con éxito");
    break;
  case "rut":
    consultaRut(rut1);
    console.log("Estudiante encontrado con éxito");
    break;
  case "actualizar":
    actualizarEstudiante(rut1, nombre1, curso1, nivel1);
    console.log("Actualizacion realizada con éxito");
    break;
  case "eliminar":
    eliminarEstudiante(rut1);
    console.log("Estudiante eliminado con éxito");
    break;
  default:
    console.log("No le alcanzó el éxito");
    break;
}

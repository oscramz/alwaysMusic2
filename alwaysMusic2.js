const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "alwaysMusic2.0",
  password: "postgre",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
});

let argumentos = process.argv.slice(2);
let funcion = argumentos[0];
let rut1 = argumentos[1];
let nombre1 = argumentos[2];
let curso1 = argumentos[3];
let nivel1 = argumentos[4];

const nuevoEstudiante = async (rut, nombre, curso, nivel) => {
  const client = await pool.connect();
  try {
    const nuevoQuery = {
      name: "nuevo_ingreso",
      text: "INSERT INTO estudiantes(rut, nombre, curso, nivel) VALUES($1, $2, $3, $4) RETURNING *",
      values: [rut, nombre, curso, nivel],
    };

    const respuesta = await client.query(nuevoQuery);
    console.log("Registros afectados: " + respuesta.rowCount);
    console.table(respuesta.rows);
    return "Registro insertado con éxito con id: " + respuesta.rows[0].id;
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};

const consultaEstudiantes = async (rut) => {
  const client = await pool.connect();
  try {
    const consultaQuery = {
      name: "consulta_general",
      text: "SELECT * FROM estudiantes order by $1",
      values: [rut],
      rowMode: "array",
    };

    const respuesta = await client.query(consultaQuery);
    console.log(respuesta.rows);
    return "Consulta realizada con éxito";
  } catch (error) {
    console.log(error.code);
  } finally {
    client.release();
  }
};

const consultaRut = async (rut) => {
  const client = await pool.connect();
  try {
    const consultaRut = {
      name: "consulta_rut",
      text: "SELECT * FROM estudiantes WHERE rut = $1",
      values: [rut],
    };
    const respuesta = await client.query(consultaRut);
    console.table(respuesta.rows);
    return respuesta.rows;
  } catch (error) {
    console.log(error.code);
  } finally {
    client.release();
  }
};

const actualizarEstudiante = async (rut, nombre, curso, nivel) => {
  const client = await pool.connect();
  try {
    const actualizarEstudiante = {
      name: "acutalizar_estudiante",
      text: "UPDATE estudiantes SET nombre = $2, curso = $3, nivel = $4 WHERE rut = $1 RETURNING *",
      values: [rut, nombre, curso, nivel],
    };
    const respuesta = await client.query(actualizarEstudiante);
    console.log("Registros afectados: " + respuesta.rowCount);
    console.table(respuesta.rows);
  } catch (error) {
    console.log(error.code);
  } finally {
    client.release();
  }
};

const eliminarEstudiante = async (rut) => {
  const client = await pool.connect();
  try {
    const eliminarEstudiante = {
      name: "eliminar_estudiante",
      text: "DELETE FROM estudiantes WHERE rut = $1 RETURNING *",
      values: [rut],
    };
    const respuesta = await client.query(eliminarEstudiante);
    console.log("Registros afectados: " + respuesta.rowCount);
    console.table(respuesta.rows);
  } catch (error) {
    console.log(error.code);
  } finally {
    client.release();
  }
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

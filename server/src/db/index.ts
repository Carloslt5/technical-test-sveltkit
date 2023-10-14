import { Pool, Client } from 'pg'

export const pool = new Pool({
  user: "admin",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "testDB"
})

async function connectDataBase() {
  const client = new Client({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'testDB',
    port: 5432,
  });

  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    console.log(result.rows[0]);
  } catch (error) {
    console.error('Error al conectar o consultar la base de datos:', error);
  } finally {
    await client.end();
  }
}

connectDataBase();
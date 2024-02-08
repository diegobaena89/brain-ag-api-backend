import pg from "pg";
const Pool = pg.Pool;

export const pool = new Pool({
  user: "brainag",
  host: "localhost",
  database: "brainagdb",
  password: "brainag",
  port: 5432,
  max: 1,
  idleTimeoutMillis: 30000,
});

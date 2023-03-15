const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.BD_USER,
  host: process.env.BD_HOST,
  database: process.env.BD_DATABASE,
  password: process.env.BD_PASS,
  port: process.env.BD_PORT
})

module.exports = {
  pool
}

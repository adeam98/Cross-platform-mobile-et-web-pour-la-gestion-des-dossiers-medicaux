const { Pool } = require('pg');
require('dotenv').config();/*Cette ligne charge les variables d’environnement définies dans le fichier .env et les rend accessibles via process.env*/

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});/* ici on crée une instance de connexion à PgSL et on a mis dadans la config nécessaire pour etablir la connexion et ca grace à dotenv qui est en haut  */

pool.connect()
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch((err) => console.error('❌ DB connection error:', err));

module.exports = pool;

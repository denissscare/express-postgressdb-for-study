const {Client} = require('pg');
require("dotenv").config();


const client = new Client({
    user: process.env.DB_USER || "username",
    password: process.env.DB_PASSWORD || "password",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DATABASE_NAME || "Your Database name",
})
client.connect();

module.exports = client;
require('dotenv').config()
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

module.exports = {
    development: {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      host: DB_HOST,
      port: 5432,
      dialect: "postgres",
      timezone: 'Asia/Jakarta'
    },
    test: {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      host: DB_HOST,
      port: 5432,
      dialect: "postgres",
      timezone: 'Asia/Jakarta'
    },
    production: {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      host: DB_HOST,
      port: 5432,
      dialect: "postgres",
      timezone: 'Asia/Jakarta'
    }
  }
  

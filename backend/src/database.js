const mysql = require("mysql");
const { promisify } = require("util");
const keys = require("./config/keys");

const Dbpool = mysql.createPool(keys.dev);
Dbpool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed by provider");
    }

    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has more than admited connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("The connection to databse was refused by provider");
    }
  }
  if (connection) {
    connection.release();
    console.log("Database connected succesfully");
    return;
  }
});
Dbpool.query = promisify(Dbpool.query);
module.exports = Dbpool;

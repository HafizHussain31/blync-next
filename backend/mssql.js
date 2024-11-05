const sql = require("mssql");

setInterval(insertdata, 10);

const sqlConfig = {
  user: "sa",
  password: "Tf168iuC!",
  database: "najmDemo",
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

async function getdata() {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(sqlConfig);
    const result =
      await sql.query`select table_name from information_schema.tables where TABLE_SCHEMA = 'dbo' and TABLE_TYPE = 'BASE Table'`;
    let tables = result.recordsets[0];

    let listoftables = tables.map((a) => a.table_name);

    console.log(listoftables);
  } catch (err) {
    console.log(err);
  }
}

let i = 446187;

async function insertdata() {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(sqlConfig);

    i++;
    let emailid = i + '@gmail.com'
    const result =
      await sql.query`insert into dbo.customers(first_name, last_name, email) values ('hh', 'hh', ${emailid})`;
    console.log(i);
  } catch (err) {
    console.log(err);
  }
}
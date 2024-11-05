const sqlite3 = require("sqlite3").verbose();
const filepath = "./blync.db";

function createDbConnection() {
  const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      return console.error(error.message);
    }
  });

  createTable(db);
  console.log("Connection with SQLite has been established");
  return db;
}


function createTable(db) {
//   db.exec(`
//   CREATE TABLE replications
//   (
//     configID INTEGER PRIMARY KEY AUTOINCREMENT,
//     connectionName VARCHAR(100) NOT NULL,
//     sourceConfig VARCHAR(4000) NOT NULL,
//     destinationConfig VARCHAR(4000) NOT NULL,
//     source VARCHAR(100) NOT NULL,
//     destination VARCHAR(100) NOT NULL,
//     isActive tinyint(1),
//     createdDate datetime,
//     createdBy VARCHAR(100) NOT NULL
//   );
// `);

db.exec(`
delete from replicationmetrics;
`);
}

function insertandselect(db) {
//   db.run(`INSERT INTO activereplications(connectionName, sourceConfig, 
//     destinationConfig, isActive, createdDate, createdBy) VALUES(?, ?, ?, ?, datetime('now','localtime'), ?)`, 
//     ['Rock', '{"hostname" : "localhost, "username" : "password"}', '{"hostname" : "localhost, "username" : "password"}', 1, 'hafiz'],
//     function(error){
//         console.log("New playlist added with id " + this.lastID);
//     }
// );

db.all(`select consumergroup, topic, partition, currentoffset, 
          totaloffset, lag, consumerid, host, clientid, createdDate from replicationmetrics where topic = ?`,
          ["server061008.dbo.Employees"],
  (error, row) => {
      console.log(row);
  }
);

}


createDbConnection();

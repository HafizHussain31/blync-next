const sqlite3 = require("sqlite3").verbose();
const filepath = "./blync.db";

function createDbConnection() {
  const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      return console.error(error.message);
    }
  });
  console.log("Connection with SQLite has been established");
  return db;
}

function getincomingmessages() {}

function getoutgoingmessages() {}

function gettopicnames(replicaitonname) {}

function getmessagesdatafortopic(topicname, minutes, db, res) {
  minutes = "-" + minutes + " minutes";

  let data = [];
  console.log(res);
  db.all(
    `select consumergroup, topic, partition, currentoffset, 
        totaloffset, lag, consumerid, host, clientid, createdDate from replicationmetrics where topic = ? and createdDate >= Datetime('now', ?, 'localtime')`,
    [topicname, minutes],
    (error, rows) => {
      rows.forEach(function (row) {
        data.push(row);
      });
      res.end(JSON.stringify(data));
    }
  );
}

module.exports.getmessagesdatafortopic = getmessagesdatafortopic;

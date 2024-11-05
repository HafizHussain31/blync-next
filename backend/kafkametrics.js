const { exec } = require("child_process");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./blync.db";

function getmetricsforgroup() {
  console.log("running command...");
  exec(
    "~/kafka/bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe -all-groups",
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        // node couldn't execute the command
        return;
      }

      // the *entire* stdout and stderr (buffered)

      let outputarr = stdout.split("\n");

      let trimmedoutput = outputarr.filter((n) => n);

      for (let i = 0; i < trimmedoutput.length; i++) {
        let element = trimmedoutput[i];
        let topicdata = element.split(" ").filter((n) => n);

        if (topicdata[0] === "GROUP") continue; // Remvoing header by filtering GROUP in consumer group value

        topicdata[3] = +topicdata[3];
        topicdata[4] = +topicdata[4];
        topicdata[5] = +topicdata[5];

        const db = new sqlite3.Database(filepath, (error) => {
          if (error) {
            return console.error(error.message);
          }
        });

        db.run(
          `INSERT INTO replicationmetrics(consumergroup, topic, partition, currentoffset, 
            totaloffset, lag, consumerid, host, clientid, createdDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now','localtime'))`,
          topicdata,
          function (error) {
            console.log(error);
            console.log("New playlist added with id " + this.lastID);
          }
        );
      }
    }
  );
}

module.exports.getmetricsforgroup = getmetricsforgroup;

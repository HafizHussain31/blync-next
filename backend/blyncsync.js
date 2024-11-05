var express = require("express");
var app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
var path = require("path");
var cors = require("cors");
const sql = require("mssql");
var axios = require("axios");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./blync.db";
var kafkametrics = require("./kafkametrics.js")
var osmetrics = require("./osmetrics.js")
var dashboard = require("./dashboard.js")

app.use(cors());

setInterval(getblyncmetrics, 1000 * 60);

const kafkaProxy = createProxyMiddleware({
  target: "http://localhost:8083/connectors/", // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites\
});

app.use("/blyncsync/connectors", kafkaProxy);

var bodyParser = require("body-parser");
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

app.use(express.static("public"));

const db = new sqlite3.Database(filepath, (error) => {
  if (error) {
    return console.error(error.message);
  }
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/process_get", function (req, res) {
  // Prepare output in JSON format
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

app.post("/blyncsync/getmssqltables", async function (req, res) {
  console.log(req.body);

  const sqlConfig = {
    user: req.body.username,
    password: req.body.password,
    database: req.body.database,
    server: req.body.hostname,
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

  console.log(sqlConfig);

  await sql.connect(sqlConfig);
  const result =
    await sql.query`select table_name from information_schema.tables where TABLE_SCHEMA = 'dbo' and TABLE_TYPE = 'BASE Table'`;
  let tables = result.recordsets[0];

  let listoftables = tables.map((a) => a.table_name);

  console.log(listoftables);

  res.end(JSON.stringify(listoftables));
});

app.post("/blyncsync/enablesqlservercdc", async function (req, res) {
  let table = req.body.table;
  const sqlConfig = {
    user: req.body.username,
    password: req.body.password,
    database: req.body.database,
    server: req.body.hostname,
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

  await sql.connect(sqlConfig);

  let query = `EXEC sys.sp_cdc_enable_table @source_schema = 'dbo', @source_name = '${table}', @role_name = NULL, @supports_net_changes = 0;`;
  var request = new sql.Request();
  request.query(query, function (err, recordset) {
    if (err) {
      console.log(err);
      sql.close();
    }
    sql.close();
    res.send(recordset);
  });
});

app.post("/blyncsync/addreplication", async function (req, res) {
  let sourceConfig = req.body.sourceConfig;
  let destinationConfig = req.body.destinationConfig;
  let connname = req.body.connectionname;
  let username = req.body.username;
  let source = req.body.source;
  let destination = req.body.destination;
  let topics = req.body.destinationConfig.config.topics;

  const resSource = await axios({
    method: "POST",
    data: sourceConfig,
    withCredentials: true,
    url: "http://localhost:8083/connectors/",
  });

  console.log("Source connector added");

  const resDestination = await axios({
    method: "POST",
    data: destinationConfig,
    withCredentials: true,
    url: "http://localhost:8083/connectors/",
  });

  console.log("Destination connector added");

  db.run(
    `INSERT INTO replications(connectionName, source, destination, sourceConfig, 
    destinationConfig, isActive, createdDate, createdBy, topics) VALUES(?, ?, ?, ?, ?, ?, datetime('now','localtime'), ?, ?)`,
    [
      connname,
      source,
      destination,
      JSON.stringify(req.body.sourceConfig),
      JSON.stringify(req.body.destinationConfig),
      1,
      username,
      topics
    ],
    function (error) {
      console.log(error);
      console.log("New playlist added with id " + this.lastID);
    }
  );

  let respone = {
    message: "Replication added successfully",
  };

  res.end(JSON.stringify(respone));
});

app.post("/blyncsync/getreplications", async function (req, res) {
  
  let data = [];

  db.all(
    "SELECT connectionName, isActive, createdDate, createdBy, source, destination, topics FROM replications",
    (error, rows) => {
      rows.forEach(function (row) {
        data.push(row);
      });
      console.log(data);
      res.end(JSON.stringify(data));
    }
  );
});

app.post("/blyncsync/getdashboarddata", async function (req, res) {

  let topic = req.body.topic;
  let minutes = req.body.minutes;

  console.log("req received getdashboarddata");

  dashboard.getmessagesdatafortopic(topic, minutes, db, res);
  
});


var server = app.listen(5000, function () {
  console.log("Express App running at http://127.0.0.1:5000/");
});

function getKafkaMetrics () {
  kafkametrics.getmetricsforgroup();
}

function osMetrics() {
  osmetrics.getDiskUsage("", db);
}

function getblyncmetrics() {
  getKafkaMetrics();
  osMetrics();
}
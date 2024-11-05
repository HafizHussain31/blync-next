var express = require('express');
var app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
var path = require('path');
const sql = require('mssql')
var contentType = require('content-type')
var getRawBody = require('raw-body')

app.use(function (req, res, next) {
   getRawBody(req, {
     length: req.headers['content-length'],
     limit: '1mb',
   }, function (err, string) {
     if (err) return next(err)
     req.text = string
     next()
   })
 })


var requestStats = require('request-stats');
var stats = requestStats(server);

stats.on('complete', function (details) {
    var size = details.req.bytes;
    console.log(size);
    
});

var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.text({ type: '*/*' }));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname,"index.html"));
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/fromtopic', async function (req, res) {

		console.log(req.headers, JSON.parse(req.text.toString()), req.socket.bytesRead);
		
		res.end(JSON.stringify(req.body));


	})

app.post('/getmssqltables', async function (req, res) {

   const sqlConfig = {
      user: req.body.username,
      password: req.body.password,
      database: req.body.database,
      server: req.body.hostname,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
    }

    await sql.connect(sqlConfig)
    const result = await sql.query`select table_name from information_schema.tables where TABLE_SCHEMA = 'dbo' and TABLE_TYPE = 'BASE Table'`
    let tables = result.recordsets[0];
  
    let listoftables = tables.map(a=> a.table_name);

   res.end(JSON.stringify(listoftables));
})

const kafkaProxy = createProxyMiddleware({
   target: 'http://localhost:8083/connectors/', // target host with the same base path
   changeOrigin: true, // needed for virtual hosted sites\
 });

app.use('/blyncsync/connectors', kafkaProxy);

app.post("/process_post", )
var server = app.listen(8087, function () {
   console.log("Express App running at http://127.0.0.1:8087/");
})

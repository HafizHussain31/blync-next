const { exec } = require('child_process');
exec('~/kafka/bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe -group connect-server021001-couchbase | grep connect-server021001-couchbase', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log(err);
    return;
  }

  // the *entire* stdout and stderr (buffered)


  let outputarr = stdout.split("\n");
  
  outputarr.forEach(element => {
    let topicdata  = element.split(' ').filter(n => n);

    let data = {
        group: topicdata[0],
        topic: topicdata[1],
        partition: topicdata[2],
        currentoffset: +topicdata[3],
        totaloffset: +topicdata[4],
        lag: topicdata[5],
        consumerid: topicdata[6],
        host: topicdata[7],
        clientid: topicdata[8],
    }

  });

  console.log(`stderr: ${stderr}`);
});

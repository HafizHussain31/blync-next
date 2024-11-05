// const { exec } = require('child_process');
// exec('~/kafka/bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --all-groups --describe', (err, stdout, stderr) => {
//   if (err) {
//     // node couldn't execute the command
//     return;
//   }

//   // the *entire* stdout and stderr (buffered)
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });


const { Kafka } = require('kafkajs')



const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})

async function describe() {
    const consumer = kafka.consumer({ groupId: 'connect-najm19-couchbase' })
    await consumer.connect()
    const data = await consumer.describeGroup()

    console.log(data);

}

describe();



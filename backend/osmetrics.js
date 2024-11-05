const checkDiskSpace = require('check-disk-space').default

// On Linux or macOS

function getDiskUsage(disk, db) {
    disk = '/'
    checkDiskSpace(disk).then((diskSpace) => {
    
        let availableGB = +(diskSpace.free / (1024 * 1024 * 1024)).toFixed(2);  
        let diskSizeGB = +(diskSpace.size / (1024 * 1024 * 1024)).toFixed(2);  
        let usedGB  = +(diskSizeGB - availableGB).toFixed(2);
    
        console.log(diskSizeGB, usedGB);

        let diskUsage = {
            diskName : disk,
            diskSizeGB,
            usedGB
        }

        console.log(diskUsage);

        db.run(
            `INSERT INTO diskmetrics(consumergroup, topic, partition, currentoffset, 
              totaloffset, lag, consumerid, host, clientid, createdDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now','localtime'))`,
            topicdata,
            function (error) {
              console.log(error);
              console.log("New playlist added with id " + this.lastID);
            }
          );
        
    })
}

module.exports.getDiskUsage = getDiskUsage;


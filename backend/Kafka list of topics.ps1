Kafka list of topics 
./kafka-topics.sh  --bootstrap-server localhost:9092 --list

Kafka connect list of connectors 
./kafka-consumer-groups.sh --bootstrap-server localhost:9092 --all-groups --describe

Result

Consumer group 'connect-server008-couchbase' has no active members.

GROUP                       TOPIC                   PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG             CONSUMER-ID     HOST            CLIENT-ID
connect-server008-couchbase server008.dbo.customers 0          1               1               0               -               -               -

Consumer group 'connect-server009-couchbase' has no active members.

GROUP                       TOPIC                   PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG             CONSUMER-ID     HOST            CLIENT-ID
connect-server009-couchbase server009.dbo.customers 0          3               3               0               -               -               -


GROUP                       TOPIC                   PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG             CONSUMER-ID                                                                   HOST            CLIENT-ID
connect-server013-couchbase server013.dbo.customers 0          6               7               1               connector-consumer-server013-couchbase-0-ee08a63a-6f67-4cf6-926b-9f23b740cb85 /127.0.0.1      connector-consumer-server013-couchbase-0

GROUP                       TOPIC                   PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG             CONSUMER-ID                                                                   HOST            CLIENT-ID
connect-server013-couchbase server013.dbo.customers 0          7               7               0               connector-consumer-server013-couchbase-0-ee08a63a-6f67-4cf6-926b-9f23b740cb85 /127.0.0.1      connector-consumer-server013-couchbase-0

 ./kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic server014.streamtopic --from-beginning

./kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic najm_data.sample.customers --from-beginning --property print.key=true

/kafka-run-class.sh kafka.tools.GetOffsetShell --broker-list localhost:9092 --topic server021001.dbo.Employees
server021001.dbo.Employees:0:48



 Important note:

 If you restart the kafka connect, and add connectors with the same name, ofsset does not change. so it works normal.

 But, what if in between some data changes to table.
 -- cdc will still have the changed updates in queue till the connectors goes up.

 So, adding connectors with same name will resume the replication from the place it started.

Also, kafka logs dir should be moved from tmp to persistant folder. 

Take snapshot of the disk where kafka is running. 

Need high and low level design 


------------------------------------------------------------------------------------------------

# current situation is

Key of the document is fetched from json body itself. This is a out of the box parameter in connectors. 
But We give only one primary key id which is common for all the tables. 
Usually, primary key column name will be different for different tables. 
So the configuration should be in such a way that primary key is set individually or update code in couchbase connect 
to take primary key id ordinally for each topic-to-collection. 

# current situation is 

Added connectors code to new UI -- it is working
Need to add connectors to database 
show the added replication on replications page
database modelling for dashboard charts



Topic name is created as `replicationname + schema + tablename` ---- for eg, weekend02. + dbo. + customers -- this was given by me

currently schema (dbo) is hardcoded by me on both frontend and backend

I am creating topic with table names, so this could be inserted into topic tables with group name as source.connectionname + "-couchbase",

I give this on source connector, group name is formed with name of source connector????? -- only when destination connector is added, topic is created



[2024-09-13 12:02:21,942] WARN [weekend09-sql-server|task-0] No maximum LSN recorded in the database; please ensure that the SQL Server Agent is running (io.debezium.connector.sqlserver.SqlServerStreamingChangeEventSource:156)

This warning could occur, when source connector and destination connector are added again and till the next record gets changed. 
also, when destinaiton connector is not added yet. --- This should not be the case, because source and destination connector goes hand in hand.
if both doesnt get added at once, delete and add it again. 


Now --- to build dashboard you need add a table with topic name and group name

1. offset number
2. read offset
3. group name
4. topic name
5. datetime 

query would be search by topic name, read offset number and read offset and datetime > now and < 30 mins

Frequency should be 30 seconds. 
so every hour, there will be 120 points. 
for 24 hours there will be ~3000 points 

group name ----> topic names
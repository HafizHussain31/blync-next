Absher Cluster Configuration using CLI

Couchbase CLI commands

1.	Cluster Initialization and addition of first node

    a)	Initialize a node --- This must be done for all the nodes before adding it to a cluster or cluster initialization

    couchbase-cli node-init -c hostname \
    -u placeholdername -p placeholderpwd \
    --node-init-data-path /opt/couchbase/var/lib/couchbase/data \
    --node-init-index-path /opt/couchbase/var/lib/couchbase/data \
    --node-init-eventing-path /opt/couchbase/var/lib/couchbase/data \
    --node-init-analytics-path /opt/couchbase/var/lib/couchbase/data \
    --node-init-java-home /opt/couchbase/bin/java \
    --node-init-hostname node1-devcluster.com \
    --ipv4

    b)	Initialize a cluster

    couchbase-cli cluster-init -c hostname --cluster-username Administrator \
    --cluster-password password --services data, eventing \
    --cluster-ramsize 2048 \
    --cluster-eventing-ramsize 1024 \
    --cluster-eventing-ramsize 1024 \
    --cluster-query-ramsize 1024 \


2.	Addition of subsequent nodes to cluster and rebalance. 

couchbase-cli server-add -c hostname:8091 \
--username Administrator \
--password password \
--server-add couchbases://10.142.181.102 \
--server-add-username someName \
--server-add-password somePassword \
--services data,eventing

couchbase-cli server-add -c hostname:8091 \
--username Administrator \
--password password \
--server-add couchbases://10.142.181.103 \
--server-add-username someName \
--server-add-password somePassword \
--services data,eventing

couchbase-cli server-add -c hostname:8091 \
--username Administrator \
--password password \
--server-add couchbases://10.142.181.104 \
--server-add-username someName \
--server-add-password somePassword \
--services data,eventing

couchbase-cli server-add -c hostname:8091 \
--username Administrator \
--password password \
--server-add couchbases://10.142.181.105 \
--server-add-username someName \
--server-add-password somePassword \
--services query,index \
--index-storage-setting dafault

couchbase-cli server-add -c hostname:8091 \
--username Administrator \
--password password \
--server-add couchbases://10.142.181.106 \
--server-add-username someName \
--server-add-password somePassword \
--services query,index

couchbase-cli server-add -c hostname:8091 \
--username Administrator \
--password password \
--server-add couchbases://10.142.181.107 \
--server-add-username someName \
--server-add-password somePassword \
--services backup

3.	Rebalance

couchbase-cli rebalance -c hostname:8091 \
--username Administrator \
--password password



"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import CheckboxWithTextbox from "../components/checkboxwithtextbox";

function Home() {
  // Form 1 state
  const [source, setSource] = useState({
    databaseType: "SQL Server",
    hostName: "",
    portNumber: "",
    userName: "",
    password: "",
    databaseName: "",
    connectionname: "",
  });

  // Form 2 state
  const [destination, setDestination] = useState({
    databaseType: "Couchbase",
    hostName: "",
    bucket: "",
    userName: "",
    password: "",
    scope: "",
  });

  const [listoftables, setListoftables] = useState([]);

  const handleCheckboxChange = (name: any, selected: boolean) => {
    console.log(name, selected);
    setListoftables((preListoftables: any) =>
      preListoftables.map((checkbox: any) =>
        checkbox.name === name
          ? { ...checkbox, selected: !checkbox.selected }
          : checkbox
      )
    );

    console.log(listoftables);
  };

  const handleTextboxChange = (collection: any, table: any) => {
    setListoftables((preListoftables: any) =>
      preListoftables.map((textbox: any) =>
        textbox.name === table
          ? { ...textbox, collectionname: collection }
          : textbox
      )
    );
  };

  const handleDocumentIdColumnChange = (documentId: any, table: any) => {
    setListoftables((preListoftables: any) =>
      preListoftables.map((textbox: any) =>
        textbox.name === table
          ? { ...textbox, documentIdColumn: documentId }
          : textbox
      )
    );
  };

  // Handle form 1 submission
  const handleForm1Submit = (e: any) => {
    e.preventDefault();
    console.log("Form 1 Data:", source);
    alert("Form 1 submitted!");
  };

  // Handle form 2 submission
  const handleForm2Submit = (e: any) => {
    e.preventDefault();
    console.log("Form 2 Data:", destination);
    alert("Form 2 submitted!");
  };

  const handleSubmit = async () => {
    console.log(listoftables);

    const selectedtables = listoftables.filter((val: any) => val.selected);

    console.log(selectedtables);

    await enablecdctotables(selectedtables);

    await addconnectors(selectedtables);
  };

  const enablecdctotables = async (selectedtables: any) => {
    console.log(
      "Enabling cdc for the following tables.... ",
      selectedtables.map((a: any) => a.name).join(",")
    );

    selectedtables.forEach(async (element: any) => {
      try {
        let data = {
          username: source.userName,
          password: source.password,
          database: source.databaseName,
          hostname: source.hostName,
          table: element.name,
        };

        const response = await fetch(
          "http://100.81.159.38:5000/blyncsync/enablesqlservercdc/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        let cdcresult = await response.json();

        console.log(cdcresult);
        console.log("Enabled");
      } catch (error) {
        console.log(error);
      }
    });
  };

  const addconnectors = async (selectedtables: any) => {
    console.log("data");
    let sourceConfig = getsourceconfig();
    let destinationConfig = getdestinationconfig(selectedtables);

    let data = {
      source: source.databaseType,
      destination: destination.databaseType,
      sourceConfig,
      destinationConfig,
      connectionname: source.connectionname,
      username: "Hafiz",
    };

    console.log(data);

    const response = await fetch(
      "http://100.81.159.38:5000/blyncsync/addreplication/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    console.log(response.json());
  };

  const getsourceconfig = () => {
    let data = {
      name: source.connectionname + "-sql-server",
      config: {
        "connector.class": "io.debezium.connector.sqlserver.SqlServerConnector",
        "tasks.max": "1",
        "database.server.name": source.connectionname, // server002
        "database.hostname": source.hostName, // localhost
        "database.port": source.portNumber, // 1433
        "database.user": source.userName, // sa
        "database.password": source.password, // Tf168iu
        "database.dbname": source.databaseName, // najmDemo
        "database.history.kafka.bootstrap.servers": "localhost:9092",
        "database.history.kafka.topic": source.connectionname + ".streamtopic",
      },
    };

    return data;
  };

  const getdestinationconfig = (selectedtables: any) => {
    let topics = "",
      topic_to_collection = "",
      topic_to_documentid = "";

    console.log(selectedtables);
    for (let i = 0; i < selectedtables.length; i++) {
      let element = selectedtables[i];
      topics += source.connectionname + ".dbo." + element.name + ",";
      topic_to_collection +=
        source.connectionname +
        ".dbo." +
        element.name +
        "=" +
        destination.bucket +
        "." +
        destination.scope +
        "." +
        element.collectionname +
        ",";

      topic_to_documentid +=
        source.connectionname +
        ".dbo." +
        element.name +
        "=/after/" + // This is hardcoded because Debezium sends SQL Server table record sends after record. 
        element.documentIdColumn +
        ",";
    }

    console.log(topics, topic_to_collection, topic_to_documentid);

    topics = topics.slice(0, -1);
    topic_to_collection = topic_to_collection.slice(0, -1);
    topic_to_documentid = topic_to_documentid.slice(0, -1);

    let data = {
      name: source.connectionname + "-couchbase",
      config: {
        name: source.connectionname + "-couchbase",
        "connector.class": "com.couchbase.connect.kafka.CouchbaseSinkConnector",
        "tasks.max": "2",
        topics: topics,
        "couchbase.seed.nodes": destination.hostName, // "127.0.0.1",
        "couchbase.bootstrap.timeout": "10s",
        "couchbase.bucket": destination.bucket, //"najm_data",
        "couchbase.username": destination.userName, // "admin",
        "couchbase.password": destination.password, // Tf168
        "couchbase.topic.to.collection": topic_to_collection,
        "couchbase.topic.to.document.id": topic_to_documentid, //hafiz coode to kafka connect
        "couchbase.document.id": "/after/id", // get from user as dots and replace dot with /
        "couchbase.persist.to": "NONE",
        "couchbase.replicate.to": "NONE",
        "key.converter": "org.apache.kafka.connect.storage.StringConverter",
        "value.converter": "org.apache.kafka.connect.json.JsonConverter",
        "value.converter.schemas.enable": "false",
      },
    };

    return data;
  };

  const sourceconnector = async () => {
    try {
      console.log("Adding source connector.....");

      let data = {
        name: source.connectionname + "-sql-server",
        config: {
          "connector.class":
            "io.debezium.connector.sqlserver.SqlServerConnector",
          "tasks.max": "1",
          "database.server.name": source.connectionname, // server002
          "database.hostname": source.hostName, // localhost
          "database.port": source.portNumber, // 1433
          "database.user": source.userName, // sa
          "database.password": source.password, // Tf168iu
          "database.dbname": source.databaseName, // najmDemo
          "database.history.kafka.bootstrap.servers": "localhost:9092",
          "database.history.kafka.topic":
            source.connectionname + ".streamtopic",
        },
      };

      console.log(data);

      const response = await fetch(
        "http://100.81.159.38:5000/blyncsync/connectors/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      console.log(response.json());

      console.log("Successfully added source connector");
    } catch (err) {
      console.log(err);
      console.log("Error adding source connector");
    }
  };

  const destinationconnector = async (selectedtables: any) => {
    let topics = "",
      topic_to_collection = "";

    console.log(selectedtables);
    for (let i = 0; i < selectedtables.length; i++) {
      let element = selectedtables[i];
      topics += source.connectionname + ".dbo." + element.name + ",";
      topic_to_collection +=
        source.connectionname +
        ".dbo." +
        element.name +
        "=" +
        destination.bucket +
        "." +
        destination.scope +
        "." +
        element.collectionname +
        ",";
    }

    console.log(topics, topic_to_collection);

    topics = topics.slice(0, -1);
    topic_to_collection = topic_to_collection.slice(0, -1);

    try {
      console.log("Adding destination connector....");
      let data = {
        name: source.connectionname + "-couchbase",
        config: {
          name: source.connectionname + "-couchbase",
          "connector.class":
            "com.couchbase.connect.kafka.CouchbaseSinkConnector",
          "tasks.max": "2",
          topics: topics,
          "couchbase.seed.nodes": destination.hostName, // "127.0.0.1",
          "couchbase.bootstrap.timeout": "10s",
          "couchbase.bucket": destination.bucket, //"najm_data",
          "couchbase.username": destination.userName, // "admin",
          "couchbase.password": destination.password, // Tf168
          "couchbase.topic.to.collection": topic_to_collection,
          "couchbase.document.id": "/after/id", // get from user as dots and replace dot with /
          "couchbase.persist.to": "NONE",
          "couchbase.replicate.to": "NONE",
          "key.converter": "org.apache.kafka.connect.storage.StringConverter",
          "value.converter": "org.apache.kafka.connect.json.JsonConverter",
          "value.converter.schemas.enable": "false",
        },
      };

      console.log(data);

      const response = await fetch(
        "http://100.81.159.38:5000/blyncsync/connectors/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      console.log(response.json());

      console.log("Successfully Added destination connector");
    } catch (err) {
      console.log(err);

      console.log("Error Adding destination connector");
    }
  };

  const listtables = async (e: any) => {
    e.preventDefault();
    console.log("listing tables.....");

    try {
      let data = {
        username: source.userName,
        password: source.password,
        database: source.databaseName,
        hostname: source.hostName,
      };

      console.log(data);

      const response = await fetch(
        "http://100.81.159.38:5000/blyncsync/getmssqltables/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      let tables = await response.json();

      console.log(tables);

      let sqltables: any = [];
      tables.forEach((element: any) => {
        sqltables.push({
          name: element,
          collectionname: element,
          documentIdColumn: "",
          selected: false,
        });
      });

      console.log(sqltables);

      setListoftables(sqltables);
    } catch (error) {}
  };

  // Mohammad Sohail: Handle Input change function form data state mai save

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    form: typeof source | typeof destination,
    setFormData: React.Dispatch<
      React.SetStateAction<typeof source | typeof destination>
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main>
      <div className="flex justify-center items-center p-2">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
      rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-host-name"
          name="connectionname"
          type="text"
          placeholder="name your replication..."
          value={source.connectionname}
          onChange={(e) => handleInputChange(e, source, setSource)}
        />
      </div>
      <main className="flex gap-16 justify-center items-center p-8">
        {/* Form 1 */}
        <form aria-label="Form-1" className="w-full max-w-lg">
          <h1 className="mb-4 text-2xl">Source</h1>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Database Type
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="databaseType"
                  value={source.databaseType}
                  onChange={(e) => handleInputChange(e, source, setSource)}
                >
                  <option>SQL Server</option>
                  <option>Postgre SQL</option>
                  <option>Orcale DB</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <MdOutlineArrowDropDown />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Host Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-host-name"
                name="hostName"
                type="text"
                placeholder="http://127.0.0.0"
                value={source.hostName}
                onChange={(e) => handleInputChange(e, source, setSource)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4 gap-2">
            <div className="w-full px-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Port Number
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="8008"
                name="portNumber"
                value={source.portNumber}
                onChange={(e) => handleInputChange(e, source, setSource)}
              />
              <p className="text-gray-600 text-xs italic">
                Give a proper port number asas
              </p>
            </div>
            <div className="w-full px-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                User Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="username"
                name="userName"
                value={source.userName}
                onChange={(e) => handleInputChange(e, source, setSource)}
              />
            </div>
            <div className="w-full px-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white"
                type="password"
                placeholder="**************"
                name="password"
                value={source.password}
                onChange={(e) => handleInputChange(e, source, setSource)}
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
            <div className="w-full px-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Database Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Database Name"
                name="databaseName"
                value={source.databaseName}
                onChange={(e) => handleInputChange(e, source, setSource)}
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={listtables}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Show Tables
            </button>
          </div>
        </form>

        {/* Form 2 */}
        <form
          aria-label="Form-2"
          className="w-full max-w-lg"
          onSubmit={handleForm2Submit}
        >
          <h1 className="mb-4 text-2xl">Destination</h1>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Database Type
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="databaseType"
                  value={destination.databaseType}
                  onChange={(e) =>
                    handleInputChange(e, destination, setDestination)
                  }
                >
                  <option>Couchbase</option>
                  <option>Mongo DB</option>
                  <option>Cassandra</option>
                  <option>Redis</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <MdOutlineArrowDropDown />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Host Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-host-name"
                name="hostName"
                type="text"
                placeholder="http://127.0.0.0"
                value={destination.hostName}
                onChange={(e) =>
                  handleInputChange(e, destination, setDestination)
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4 gap-2">
            <div className="w-full px-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Bucket
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="bucket name"
                name="bucket"
                value={destination.bucket}
                onChange={(e) =>
                  handleInputChange(e, destination, setDestination)
                }
              />
              <p className="text-gray-600 text-xs italic">
                Give a valid bucket name
              </p>
            </div>
            <div className="w-full px-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                User Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="username"
                name="userName"
                value={destination.userName}
                onChange={(e) =>
                  handleInputChange(e, destination, setDestination)
                }
              />
            </div>
            <div className="w-full px-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white"
                type="password"
                placeholder="**************"
                name="password"
                value={destination.password}
                onChange={(e) =>
                  handleInputChange(e, destination, setDestination)
                }
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
            <div className="w-full px-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Scope
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Scope"
                name="scope"
                value={destination.scope}
                onChange={(e) =>
                  handleInputChange(e, destination, setDestination)
                }
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Show Collections
            </button>
          </div>
        </form>
      </main>

      {listoftables.length > 0 && (
        <div >
          <h3>Select tables to replicate</h3>

          {listoftables.map((obj: any, index) => (
            <li key={index} >
              <CheckboxWithTextbox
                initialChecked={obj.selected}
                checkboxlabel={obj.name}
                collection={obj.collectionname}
                documentId={obj.documentIdColumn}
                onCheckboxChange={() =>
                  handleCheckboxChange(obj.name, obj.selected)
                }
                onTextboxChange={handleTextboxChange}
                onDocumentIdColumnChange={handleDocumentIdColumnChange}
              ></CheckboxWithTextbox>
            </li>
          ))}

          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Replication
          </button>
        </div>
      )}
    </main>
  );
}

export default Home;

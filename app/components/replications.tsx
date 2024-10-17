"use client";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

function Replications({onReplicationSelect }) {
  useEffect(() => {
    getreplications(); // this will fire only on first render
  }, []);

  const [replications, setReplications] = useState([]);

  const columns = [
    {
      key: "replication",
      label: "Replcation Name",
    },
    {
      key: "source",
      label: "Source",
    },
    {
      key: "destination",
      label: "Destination",
    },
    {
      key: "ops",
      label: "Current OP/s",
    },
    {
      key: "health",
      label: "Health",
    },
  ];

  const getreplications = async () => {

    let data = {};

    const response = await fetch(
      "http://100.81.159.38:5000/blyncsync/getreplications/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    let replicationsData = await response.json();

    let replicationsarray: any = [];

    replicationsData.forEach((element: any, index: number) => {
      replicationsarray.push({
        key: index,
        replication: element.connectionName,
        source: element.source,
        destination: element.destination,
        ops: "10",
        health: "Active",
      });
    });

    console.log(replications);

    setReplications(replicationsarray);
  };

  const gotodashboard = (key: any) => {
    onReplicationSelect(key)
  };

  return (
    <Table
      isStriped
      aria-label="Selection behavior table example with dynamic content"
      selectionMode="multiple"
      selectionBehavior="replace"
      onRowAction={(key)=> gotodashboard(key)}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {replications.map((row: any) => (
          <TableRow key={row.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(row, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Replications;

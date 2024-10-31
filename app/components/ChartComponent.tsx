import React from "react";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Card, CardContent, Grid2, Typography } from "@mui/material";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MdOutlineArrowDropDown } from "react-icons/md";
import {
  //   Line as LineChart,
  //   Bar as BarChart,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const Dashboard: React.FC = () => {
  useEffect(() => {
    getreplications();
    getdashboarddata("", "30"); // this will fire only on first render
  }, []);

  const [replications, setReplications] = useState([]);

  const [tables, setTables] = useState([]);

  const [incomingChartData, setIncomingChartData] = useState();

  const [outgoingChartData, setOutgoingChartData] = useState();

  const [lagChartData, setLagChartData] = useState();

  const [cpuChartData, setCpuChartData] = useState();

  const [memoryChartData, setMemoryChartData] = useState();

  const [diskChartData, setDiskChartData] = useState();

  const [dashboard, setDashboard] = useState({
    replication: "",
    topic: "",
    duration: ""
  });

  const handleDurationChange = (
    e: ChangeEvent<HTMLInputElement>,
    form: typeof dashboard,
    setDashboard: React.Dispatch<
      React.SetStateAction<typeof dashboard>
    >
  ) => {
   
    const { name, value } = e.target;
    setDashboard((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    getdashboarddata(name, value);
  };

  const handleReplicationChange = (
    e: ChangeEvent<HTMLInputElement>,
    form: typeof dashboard,
    setDashboard: React.Dispatch<
      React.SetStateAction<typeof dashboard>
    >
  ) => {
   
    const { name, value } = e.target;
    setDashboard((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    let topics: any = replications.filter((a : any) => a.replication === value).map((a : any) => a.topics);
    
   setTables(topics);

    //getdashboarddata(name, value);
  };

  const getdashboarddata = async (topic: string, minutes: string) => {

    console.log(minutes);
    

    let data = {
      topic : "server151002.dbo.Employees",
      minutes : minutes
    };

    console.log(data);

    const response = await fetch(
      "http://100.81.159.38:5000/blyncsync/getdashboarddata/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    let dashboardData = await response.json();

    console.log(dashboardData);

    let incoming = dashboardData.slice(1).map((a: any, i: any) => {
      const { totaloffset, createdDate } = a;
      return {
        x: new Date(createdDate).getTime(),
        y: totaloffset - dashboardData[i].totaloffset,
      };
    });

    console.log(incoming);

    let outgoingData = dashboardData.slice(1).map((a: any, i: any) => {
      const { currentoffset, createdDate } = a;
      return {
        x: new Date(createdDate).getTime(),
        y: currentoffset - dashboardData[i].currentoffset,
      };
    });

    let lagData = dashboardData.slice(1).map((a: any, i: any) => {
      const { lag, createdDate } = a;
      return {
        x: new Date(createdDate).getTime(),
        y: lag
      };
    });


    let incomingChart: Options = {
      chart: {
        type: "line",
        width: "400"
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
      },
      title: {
        text: "Incoming Messages",
      },
      series: [
        {
          // `type: column` is required for type-checking this options as a column series
          type: "line",
          data: incoming,
        },
      ],
      xAxis: [
        {
          type: "datetime",
        },
      ],
    };

    let outgoingChart: Options = {
      chart: {
        type: "area",
        width: "400"
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          fillOpacity: 0.2,
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
      },
      title: {
        text: "Outgoing Messages",
      },
      series: [
        {
          // `type: column` is required for type-checking this options as a column series
          type: "area",
          data: outgoingData,
          color: "purple"
        },
      ],
      xAxis: [
        {
          type: "datetime",
        },
      ],
    };

    let lagChart: Options = {
      chart: {
        type: "line",
        width: "400"
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
      },
      title: {
        text: "Messages in Queue",
      },
      series: [
        {
          // `type: column` is required for type-checking this options as a column series
          type: "line",
          data: lagData,
          color: "red"
        },
      ],
      xAxis: [
        {
          type: "datetime",
        },
      ],
    };

    let cpuChart: Options = {
      chart: {
        type: "area",
        width: "400"
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          fillOpacity: 0.2,
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
      },
      title: {
        text: "Outgoing Messages",
      },
      series: [
        {
          // `type: column` is required for type-checking this options as a column series
          type: "area",
          data: outgoingData,
          color: "green"
        },
      ],
      xAxis: [
        {
          type: "datetime",
        },
      ],
    };

    let memoryChart: Options = {
      chart: {
        type: "area",
        width: "400"
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          fillOpacity: 0.2,
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
      },
      title: {
        text: "Outgoing Messages",
      },
      series: [
        {
          // `type: column` is required for type-checking this options as a column series
          type: "area",
          data: outgoingData,
          color: "orange"
        },
      ],
      xAxis: [
        {
          type: "datetime",
        },
      ],
    };

    setIncomingChartData(incomingChart);
    setOutgoingChartData(outgoingChart);
    setLagChartData(lagChart);
    setCpuChartData(cpuChart);
    setMemoryChartData(memoryChart);
  };

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
        topics: element.topics
      });
    });

    console.log(replications);

    setReplications(replicationsarray);
  };

  return (
    <div>

<div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Replication
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="replication"
                  value={dashboard.replication}

                  onChange={(e) =>
                    handleReplicationChange(e, dashboard, setDashboard)
                  }
                >
                  {replications.map((val: any, i) => <option key={i} value={val.replication}>{val.replication}</option>)}
                 
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <MdOutlineArrowDropDown />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Table Name
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="databaseType"
                >
                 {tables.map((val: any, i) => <option key={i} value={val}>{val.split(".")[2]}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <MdOutlineArrowDropDown />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Timeline
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="duration"
                  value={dashboard.duration}
                  onChange={(e) =>
                    handleDurationChange(e, dashboard, setDashboard)
                  }
                >
                  <option value="30">30 Minutes</option>
                  <option value="60">1 Hour</option>
                  <option value="360">6 Hours</option>
                  <option value="1440">1 Day</option>
                  <option value="10080">7 Days</option>
                  <option value="43200">30 Days</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <MdOutlineArrowDropDown />
                </div>
              </div>
            </div>
          </div>

   
    <Grid2 container spacing={2}>
       
      <Grid2 item xs={8} sm={4} md={4}>
        <Card>
          <CardContent>
            <HighchartsReact
              highcharts={Highcharts}
              options={incomingChartData}
            />
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 item xs={8} sm={4} md={4}>
        <Card>
          <CardContent>
            <HighchartsReact
              highcharts={Highcharts}
              options={outgoingChartData}
            />
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 item xs={8} sm={4} md={4}>
        <Card>
          <CardContent>
            <HighchartsReact
              highcharts={Highcharts}
              options={lagChartData}
            />
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <HighchartsReact
              highcharts={Highcharts}
              options={cpuChartData}
            />
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <HighchartsReact
              highcharts={Highcharts}
              options={memoryChartData}
            />
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>

    </div>
  );
};

export default Dashboard;

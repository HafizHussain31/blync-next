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
    getdashboarddata(); // this will fire only on first render
  }, []);

  const [incomingChartData, setIncomingChartData] = useState();

  const [outgoingChartData, setOutgoingChartData] = useState();

  const getdashboarddata = async () => {
    console.log("hello");

    let data = {};

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

    let incomingData = dashboardData
      .slice(1)
      .map(
        (a: { totaloffset: any }, i: any) =>
          a.totaloffset - dashboardData[i].totaloffset
      );

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

    console.log(incomingData);

    let incomingChart: Options = {
      chart: {
        type: "line",
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

    setIncomingChartData(incomingChart);
    setOutgoingChartData(outgoingChart);
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
                  name="databaseType"
                >
                  <option>Replication 1</option>
                  <option>Replication 2</option>
                  <option>Replication 3</option>
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
                  <option>Table 1</option>
                  <option>Table 2</option>
                  <option>Table 3</option>
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
                  name="databaseType"
                >
                  <option value="30">30 Minutes</option>
                  <option value="60">1 Hour</option>
                  <option value="360">6 Hours</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <MdOutlineArrowDropDown />
                </div>
              </div>
            </div>
          </div>

   
    <Grid2 container spacing={2}>
       
      <Grid2 item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <HighchartsReact
              highcharts={Highcharts}
              options={incomingChartData}
            />
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <HighchartsReact
              highcharts={Highcharts}
              options={outgoingChartData}
            />
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <HighchartsReact
              highcharts={Highcharts}
              options={incomingChartData}
            />
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <HighchartsReact
              highcharts={Highcharts}
              options={outgoingChartData}
            />
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>

    </div>
  );
};

export default Dashboard;

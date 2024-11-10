import React, { useEffect, useState } from "react";
import "./styles.scss";
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from "@mui/material";
import ExportedData from '../../assets';
import incomingData from '../../sampleData/incomingmessages.json';
import { useDispatch } from "react-redux";
import { getDashboardData } from "../../redux/reducers/dashboardSlice";

const Dashboard = () => {

  const dispatch = useDispatch();

  const options = {
    title: {
      text: ''
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6],
      }
    ],
    credits: false
  };

  const [incomingChartData, setIncomingChartData] = useState();

  const [outgoingChartData, setOutgoingChartData] = useState();

  const [lagChartData, setLagChartData] = useState();

  const [cpuChartData, setCpuChartData] = useState();

  const [memoryChartData, setMemoryChartData] = useState();


  useEffect(() => {
    dispatch(getDashboardData())
    getChartData();
  }, []);

  const getChartData = () => {

    let incoming = incomingData.slice(1).map((a, i) => {
      const { totaloffset, createdDate } = a;
      return {
        x: new Date(createdDate).getTime(),
        y: totaloffset - incomingData[i].totaloffset,
      };
    });

    console.log(incoming, 'incoming');
    

    let outgoingData = incomingData.slice(1).map((a, i) => {
      const { currentoffset, createdDate } = a;
      return {
        x: new Date(createdDate).getTime(),
        y: currentoffset - incomingData[i].currentoffset,
      };
    });

    let lagData = incomingData.slice(1).map((a, i) => {
      const { lag, createdDate } = a;
      return {
        x: new Date(createdDate).getTime(),
        y: lag
      };
    });

    let incomingChart = {
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
          data: incomingData,
        },
      ],
      xAxis: [
        {
          type: "datetime",
        },
      ],
    };

    let outgoingChart = {
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
          data: incomingData,
          color: "purple"
        },
      ],
      xAxis: [
        {
          type: "datetime",
        },
      ],
    };

    let lagChart = {
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
        text: "Messages in Queue",
      },
      series: [
        {
          // `type: column` is required for type-checking this options as a column series
          type: "line",
          data: incomingData,
          color: "red"
        },
      ],
      xAxis: [
        {
          type: "datetime",
        },
      ],
    };

    let cpuChart = {
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
          data: incomingData,
          color: "green"
        },
      ],
      xAxis: [
        {
          type: "datetime",
        },
      ],
    };

    let memoryChart = {
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
          data: incomingData,
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
    
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <p>Dashboard</p>
        <div className="row">
          <div className="col-6">
            <Card className="card-container-dashboard">
              {incomingChartData && <HighchartsReact
                highcharts={Highcharts}
                options={incomingChartData} />}
            </Card>
          </div>
          <div className="col-6">
            <Card className="card-container-dashboard">
              {outgoingChartData && <HighchartsReact
                highcharts={Highcharts} options={outgoingChartData} />}
            </Card>
          </div>
          <div className="row mt-5">
            <div className="col-6">
            <Card className="card-container-dashboard">
              {lagChartData && <HighchartsReact
                highcharts={Highcharts} options={lagChartData} />}
                </Card>
            </div>
            <div className="col-6">
            <Card className="card-container-dashboard">
             {cpuChartData && <HighchartsReact
                highcharts={Highcharts} options={cpuChartData} />}
                </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

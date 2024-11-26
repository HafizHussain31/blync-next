import React, { useEffect, useState } from "react";
import "./styles.scss";
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from "@mui/material";
import ExportedData from '../../assets';
import incomingData from '../../sampleData/incomingmessages.json';
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../redux/reducers/dashboardSlice";
import { getReplicationData } from "../../redux/reducers/replicationSlice";
import DropDownComponent from "../../components/dropDown";
import { ErrorToast } from "../../components/errorToast";

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

  const [incomingChartData, setIncomingChartData] = useState({});
  const [hasIncomingChartData, setHasIncomingChartData] = useState(false);

  const [outgoingChartData, setOutgoingChartData] = useState([]);
  const [hasOutgoingChartData, setHasOutgoingChartData] = useState(false);

  const [lagChartData, setLagChartData] = useState([]);
  const [hasLagChartData, setHasLagChartData] = useState(false);

  const [cpuChartData, setCpuChartData] = useState();

  const [memoryChartData, setMemoryChartData] = useState();

  const [replicationsData, setReplicationsData] = useState([]);

  const [selectedReplication, setSelectedReplication] = useState(null);

  const [tableData, setTableData] = useState([]);

  const [selectedTable, setSelectedTable] = useState(null);

  const [timeoutData, setTimeoutData] = useState([
    {
      label: '30 Minutes',
      value: 30
    },
    {
      label: '1 Hour',
      value: 60
    },
    {
      label: '6 Hours',
      value: 360
    },
    {
      label: '1 Day',
      value: 1440
    },
    {
      label: '7 Days',
      value: 10080
    },
    {
      label: '30 Days',
      value: 43200
    },
  ]);

  const [selectedTimeout, setSelectedTimeout] = useState(null);

  const replicationReduxData = useSelector((state) => state.replication.data ?? []);


  useEffect(() => {
    dispatch(getReplicationData());
    getChartData(null);
  }, []);

  const getChartData = (request) => {
    console.log(request, 'a');
    

    getDashboardData(request).then(res => {
      if (res && Array.isArray(res) && res.length > 0) {

        let data = [...res];

        let incoming = data.slice(1)
          .map((a, i) => {
            const { totaloffset, createdDate } = a;
            const x = new Date(createdDate).getTime();
            const y = totaloffset - (incomingData[i]?.totaloffset || 0);
            return { x, y };
          })
          .filter(({ x, y }) => x !== null && y !== null && x !== undefined && y !== undefined);

        let outgoingData = data.slice(1)
          .map((a, i) => {
            const { currentoffset, createdDate } = a;
            const x = createdDate ? new Date(createdDate).getTime() : null;
            const y = currentoffset != null ? currentoffset - (incomingData[i]?.currentoffset || 0) : null;
            return { x, y };
          })
          .filter(({ x, y }) => x !== null && y !== null && x !== undefined && y !== undefined);

        let lagData = data.slice(1)
          .map((a, i) => {
            const { lag, createdDate } = a;
            const x = createdDate ? new Date(createdDate).getTime() : null;
            const y = lag != null ? lag : null;
            return { x, y };
          })
          .filter(({ x, y }) => x !== null && y !== null && x !== undefined && y !== undefined);

          setHasIncomingChartData(incoming.length > 0);
          setHasLagChartData(lagData.length > 0)
          setHasOutgoingChartData(outgoingData.length > 0)

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

        // let cpuChart = {
        //   chart: {
        //     type: "area",
        //   },
        //   credits: {
        //     enabled: false,
        //   },
        //   plotOptions: {
        //     series: {
        //       fillOpacity: 0.2,
        //       marker: {
        //         enabled: false,
        //         states: {
        //           hover: {
        //             enabled: false,
        //           },
        //         },
        //       },
        //     },
        //   },
        //   title: {
        //     text: "Outgoing Messages",
        //   },
        //   series: [
        //     {
        //       // `type: column` is required for type-checking this options as a column series
        //       type: "area",
        //       data: incomingData,
        //       color: "green"
        //     },
        //   ],
        //   xAxis: [
        //     {
        //       type: "datetime",
        //     },
        //   ],
        // };

        // let memoryChart = {
        //   chart: {
        //     type: "area",
        //   },
        //   credits: {
        //     enabled: false,
        //   },
        //   plotOptions: {
        //     series: {
        //       fillOpacity: 0.2,
        //       marker: {
        //         enabled: false,
        //         states: {
        //           hover: {
        //             enabled: false,
        //           },
        //         },
        //       },
        //     },
        //   },
        //   title: {
        //     text: "Outgoing Messages",
        //   },
        //   series: [
        //     {
        //       // `type: column` is required for type-checking this options as a column series
        //       type: "area",
        //       data: incomingData,
        //       color: "orange"
        //     },
        //   ],
        //   xAxis: [
        //     {
        //       type: "datetime",
        //     },
        //   ],
        // };

        setIncomingChartData(incomingChart);
        setOutgoingChartData(outgoingChart);
        setLagChartData(lagChart);
        // setCpuChartData(cpuChart);
        // setMemoryChartData(memoryChart);
      }

      // }
    }).catch(err => {

    })
  }

  useEffect(() => {
    if(selectedReplication && selectedTable && selectedTimeout){
      let request = {
        topic: selectedTable?.value,
        minutes: selectedTimeout?.value
      }

      console.log(request);
      

      getChartData(request);
    }
  }, [selectedReplication, selectedTable, selectedTimeout])

  useEffect(() => {
    if (replicationReduxData && Array.isArray(replicationReduxData) && replicationReduxData.length > 0) {
      let data = []
      for (let i = 0; i < replicationReduxData.length; i++) {
        const element = replicationReduxData[i];

        let object = {
          label: element?.connectionName,
          value: element?.topics
        }

        data.push(object);

      }
      setReplicationsData(data)
    }
  }, [replicationReduxData])

  const onChangeReplication = (object) => {
    if (object !== null) {
      setSelectedReplication(object);

      let value = object?.value;

      if (value != null && typeof value == 'string') {
        const valueArray = value.split(",").map(it => ({ label: it, value: it }));
        console.log(valueArray)
        setTableData(valueArray)
      } else {
        ErrorToast("No Tables are associated to this replication.");
      }

    } else {
      setTableData([]);
      setSelectedTable(null);
      setSelectedTimeout(null);
      setSelectedReplication(null);
    }

  }


  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <p>Dashboard</p>

        <div className="row mb-4">
          <div className="col-4">
            <DropDownComponent
              options={replicationsData}
              borderGreen
              value={selectedReplication}
              onChange={(e) => {
                onChangeReplication(e)
              }}
              placeholder="Select a Replication Name"
            />
          </div>
          <div className="col-4">
            <DropDownComponent
              options={tableData}
              borderGreen
              value={selectedTable}
              onChange={(e) => {
                setSelectedTable(e)
              }}
              placeholder="Select a table"
            />
          </div>
          <div className="col-4">
            <DropDownComponent
              options={timeoutData}
              borderGreen
              value={selectedTimeout}
              onChange={(e) => {
                setSelectedTimeout(e)
              }}
              placeholder="Select a timeout"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <Card className="card-container-dashboard">
              {(hasIncomingChartData) ? <HighchartsReact
                highcharts={Highcharts} options={incomingChartData} /> : <label className="mb-4">No Data available</label>}
            </Card>
          </div>
          <div className="col-6">
            <Card className="card-container-dashboard">
              {(hasOutgoingChartData) ? <HighchartsReact
                highcharts={Highcharts} options={outgoingChartData} /> : <label className="mb-4">No Data available</label>}
            </Card>
          </div>
          <div className="row mt-5">
            <div className="col-6">
              <Card className="card-container-dashboard">
                {(hasLagChartData) ? <HighchartsReact
                  highcharts={Highcharts} options={lagChartData} /> : <label className="mb-4">No Data available</label>}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

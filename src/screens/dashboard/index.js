import React, { useEffect, useState } from "react";
import "./styles.scss";
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Dashboard = () => {

  const options = {
    title: {
      text: 'My chart'
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6]
      }
    ]
  };


  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <p>Dashboard</p>
        <div className="row">
          <div className="col-6">
            <HighchartsReact
              highcharts={Highcharts} options={{
                ...options,
                chart: {
                  type: "spline"
                }
              }} />
          </div>
          <div className="col-6">
            <HighchartsReact
              highcharts={Highcharts} options={{
                ...options,
                chart: {
                  type: "bar"
                }
              }} />
          </div>
          <div className="row mt-5">
            <div className="col-6">
              <HighchartsReact
                highcharts={Highcharts} options={{
                  ...options,
                  chart: {
                    type: "pie"
                  }
                }} />
            </div>
            <div className="col-6">
              <HighchartsReact
                highcharts={Highcharts} options={{
                  ...options,
                  chart: {
                    type: "area"
                  }
                }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

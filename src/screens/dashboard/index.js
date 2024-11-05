import React, { useEffect, useState } from "react";
import "./styles.scss";
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from "@mui/material";
import ExportedData from '../../assets'
const Dashboard = () => {

  const options = {
    title: {
      text: 'My chart'
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6],
      }
    ],
    credits: false
  };


  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <p>Dashboard</p>
        {/* <div className="row">

          <div className="col-6">
            <div className="row align-items-stretch">

              <div className="col-5">

                <Card className="card-container-dashboard">
                  <label className="total-revenue">Total Revenue ($)</label>
                  <label className="tr-amt mt-2">$ 24,165</label>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <label className="tr-hrs">24 hours</label>
                    <img src={ExportedData.Icons.time} className="tr-icon" />
                  </div>
                </Card>

                <Card className="card-container-dashboard mt-3 d-flex flex-column align-items-center">
                  <label className="sm-title">Social Media</label>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <div className="outline">
                      <img src={ExportedData.Icons.social} className="tr-icon" />
                    </div>
                    <label className="sm-count">&nbsp;5.68K &nbsp; 3.84K&nbsp;</label>
                    <div className="outline">
                      <img src={ExportedData.Icons.twitter} className="tr-icon" />
                    </div>
                  </div>
                </Card>

              </div>

              <div className="col-7">
                <Card className="card-container-dashboard d-flex flex-column">
                  <label className="sm-title">Category Wise Breakup</label>
                  <div className="d-flex flex-column align-items-center donut-chart">
                    <HighchartsReact
                      highcharts={Highcharts} options={{
                        ...options,
                      }} />
                  </div>
                </Card>

              </div>

            </div>

          </div>

          <div className="col-7">

          </div>

        </div> */}
        {/* <div className="row">

          <div className="col-5">

          </div>

          <div className="col-7">

          </div>

        </div>
        <div className="row">

          <div className="col-6">

          </div>

          <div className="col-6">

          </div>

        </div> */}
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

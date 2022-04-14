import React, { Component } from "react";
import Header from "../Containers/header";
import { Bar } from "react-chartjs-2";
import ExpenseGraph from "../Charts/bar-chart";

const state = {
  labels: [ "January", "February", "March", "April", "May" ],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [ 65, 59, 80, 81, 56 ],
    },
  ],
};

export class ChartJSGraph extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header title="Home Page" />
        <div className="" style={{ padding: "30px" }}>
          {/* <NoteCard /> */}
          <h1>HOME PAGE</h1>
          <div className="home-graph-container">
            {/* <h1>Expense Graph</h1> <br /> */}
            <ExpenseGraph />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { setMonthName } from "../Helpers/getDate";

const ExpenseGraph = props => {
  const [ _final, _setFinal ] = useState();
  const [ _data, _setData ] = useState([]);
  const [ _month, _setMonth ] = useState([]);

  const setExpense = () => {
    let curr_date = new Date();
    const arr = props.expenses;
    const final = [];
    console.log(curr_date.getMonth(),"/************** FINAL ********************",props.isUserValid.reg_on.split("/")[1]);

    while (
      (curr_date.getMonth()+1) >=
      Number(props.isUserValid.reg_on.toLocaleString().split("/")[1]) // false
    ) {
      let expenses = [];
      let temp_date = new Date();
      let month = Number(curr_date.getMonth());
      temp_date.setDate(1);
      temp_date.setMonth(month);
      let dayscount = month % 2 == 0 ? 31 : 30;
      dayscount = month == 1 ? 28 : dayscount;

      for (let i = 0; i < dayscount; i++) {
        expenses.push({
          month: setMonthName(month),
          name: `Day ${i + 1}`,
          expense: 0,
          list: [],
        });
      }

      while (temp_date.getDate() != dayscount) {
        let total = 0;
        for (let j = 0; j < arr.length; j++) {
          if (
            arr[j].added_on.split(",")[0] ==
            temp_date.toLocaleString().split(",")[0]
          ) {
            total = total + Number(arr[j].cost);
            expenses[arr[j].added_on.split("/")[0] - 1].expense = total;
            expenses[arr[j].added_on.split("/")[0] - 1].list.push(arr[j]);
          }
        }

        temp_date.setDate(temp_date.getDate() + 1);
      }

      //
      final.push({ expenses });
      console.log(final, "/************** FINAL ********************");

      _setData(final[0]);
      _setMonth(final[0].expenses[0].month);
      curr_date.setMonth(curr_date.getMonth() - 1);
    }
  };
  useEffect(() => {
    setExpense();
  }, []);

  return (
    <div className="">
      <h4>Current Month - {_month}</h4> <br />
      <BarChart width={1200} height={350} data={_data.expenses} barSize={10}>
        <YAxis />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="expense" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isUserValid: state.authReducer,
    categories: state.CategoryReducer,
    expenses: state.ExpenseReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseGraph);

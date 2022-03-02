import React, { Component } from "react";
import CloseButton from "../Helpers/close-button";
import Logo from "../Assets/SVG-JSX/home-logo";
import Header from "../Containers/header";
import FloatingButton from "../Containers/floating-button";
import Colors from "../Helpers/colors";
import { GetCurrentDate } from "../Helpers/getDate";
import axios from "axios";
import { connect } from "react-redux";

const data = [
  {
    date: "01/02/2022",
    expense: "Notebooks",
    cost: 200,
    category: "Stationary",
    color: "#FFF48F",
  },
];

class ExpensesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddExpense: false,
      showAddCategory: true,
    };
  }

  showAddCategoryPopup = () => {
    this.setState({
      showAddExpense: false,
      showAddCategory: true,
    });
  };

  render() {
    return (
      <div className="expense-page">
        <Header title="Expenses" />

        <div className="expense-section just-center">
          <div className="expense-container">
            <div className="date-header">
              <h1>01/01/2022</h1>
            </div>
            {data.map(item => (
              <div
                className="expense-div just-space"
                style={{
                  backgroundColor: `${item.category}`,
                }}
              >
                <div className="">
                  <p>{item.category}</p>
                  <h1 className="head-18-semi"> {item.expense}</h1>
                </div>
                <h1 className="head-18-semi">{item.cost}/-</h1>
              </div>
            ))}

            <div className="expense-total-div just-space">
              <h1 className="head-18-semi">Total</h1>
              <h1 className="head-18-semi">300/-</h1>
            </div>
          </div>
        </div>

        {this.state.showAddExpense ? (
          <div className="dark-back just-center">
            <AddExpensePopup
              user={this.props.isUserValid}
              addCategory={() => this.showAddCategoryPopup()}
              close={() => this.setState({ showAddExpense: false })}
            />
          </div>
        ) : this.state.showAddCategory ? (
          <div className="dark-back just-center">
            <AddCategoryPopup
              user={this.props.isUserValid}
              close={() => this.setState({ showAddCategory: false })}
            />
          </div>
        ) : null}

        <div className="floating-button">
          <FloatingButton
            text="+"
            callback={() => {
              this.setState({ showAddExpense: true });
            }}
          />
        </div>
      </div>
    );
  }
}

export class AddExpensePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: "",
      selected_category: "",
      cost: "",
      added_on: "",
    };
  }

  addNewExpense = async () => {
    try {
      const data = {
        expense_id: (Math.random() + 1).toString(36).substring(7),
        expense: this.state.expense,
        category: this.state.selected_category,
        cost: this.state.cost,
        added_on: GetCurrentDate(),
      };
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/add-expense`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="add-note-popup">
        <div className="just-space">
          <h1>Add New Expense +</h1>
          <CloseButton
            callback={() => {
              this.props.close();
            }}
          />
        </div>

        <div className="note-popup-form ">
          <div className=" m-yy-20">
            <label className="head-16-semi col-200" htmlFor="">
              Expense
            </label>
            <span className="input-wrapper">
              <input
                value={this.state.expense}
                onChange={e => this.setState({ expense: e.target.value })}
                className="input-box head-16-semi"
                type="text"
              />
            </span>
          </div>

          <div className=" m-yy-20">
            <label className="head-16-semi col-200" htmlFor="">
              Cost
            </label>
            <span className="input-wrapper">
              <input
                value={this.state.cost}
                onChange={e => this.setState({ cost: e.target.value })}
                className="input-box head-16-semi"
                type="number"
              />
            </span>
          </div>

          <div className="d-flex-center m-yy-20">
            <label className="head-16-semi col-200" htmlFor="">
              Category
            </label>

            <select className="select-box head-16-semi">
              <option
                value={this.state.selected_category}
                onChange={e =>
                  this.setState({ selected_category: e.target.value })}
                value=""
                hidden
              >
                Select
              </option>
            </select>

            <span className="button-wrapper">
              <button
                onClick={() => {
                  this.props.addCategory();
                }}
                className="secondary_button head-16-semi m-xx-20"
              >
                {" "}
                +{" "}
              </button>
            </span>
          </div>

          <div className=" m-yy-20">
            <label className="head-16-semi col-200" htmlFor="" />
            <span className="button-wrapper">
              <button className="primary_button head-16-semi">
                Add Expense
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export class AddCategoryPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_category: "",
      selectedColor: "",
    };
  }

  addNewCategory = async () => {
    try {
      const data = {
        user_id: this.props.user.user_id,
        category_id: (Math.random() + 1).toString(36).substring(7),
        color: this.state.selectedColor,
        category: this.state.new_category,
        added_on: GetCurrentDate(),
      };

      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/add-category`,
        data
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="add-note-popup">
        <div className="just-space">
          <h1>Add New Category +</h1>
          <CloseButton
            callback={() => {
              this.props.close();
            }}
          />
        </div>
        <div className="note-popup-form">
          <div className=" m-yy-20">
            <label className="head-16-semi col-200" htmlFor="">
              New Category
            </label>
            <span className="input-wrapper">
              <input
                value={this.state.new_category}
                onChange={e => this.setState({ new_category: e.target.value })}
                className="input-box head-16-semi"
                type="text"
              />
            </span>
          </div>

          <div className=" m-yy-20 d-flex">
            <label className="head-16-semi col-200" htmlFor="">
              Color
            </label>
            <span className="d-flex">
              {Colors.map(item => (
                <div
                  onClick={() => this.setState({ selectedColor: item.color })}
                  style={{ backgroundColor: `${item.color}` }}
                  className={
                    item.color == this.state.selectedColor ? (
                      "color-pick-selected"
                    ) : (
                      "color-pick"
                    )
                  }
                />
              ))}
            </span>
          </div>

          <div className=" m-yy-20">
            <label className="head-16-semi col-200" htmlFor="" />
            <span className="button-wrapper">
              <button
                onClick={() => this.addNewCategory()}
                className="primary_button head-16-semi"
              >
                Add Category
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserValid: state.authReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesPage);

import React, { Component, useState } from "react";
import CloseButton from "../Helpers/close-button";
import Logo from "../Assets/SVG-JSX/home-logo";
import Header from "../Containers/header";
import FloatingButton from "../Containers/floating-button";
import Colors from "../Helpers/colors";
import { GetCurrentDate } from "../Helpers/getDate";
import axios from "axios";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { addCategory, addExpense } from "../Services/Actions/[ EXPENSE ]";
import { ToastContainer, toast } from "react-toastify";
import { InfoNotify, ErrorNotify, WarningNotify } from "../Helpers/popups";

class ExpensesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddExpense: false,
      user_mode: "dark-mode",
      showAddCategory: false,
      allCategories: [],
      allExpenses: [],
      total: 0,
      allData: [],
      allDataTotal: [],
      available_colors: [],
    };
  }

  showAddCategoryPopup = () => {
    this.setState({
      showAddExpense: false,
      showAddCategory: true,
    });
  };

  setExpense = () => {
    let curr_date = new Date();
    const arr = this.props.expenses;
    const final = [];
    const final_totals = [];
    while (
      curr_date.toLocaleString().split(",")[0] >=
      this.props.isUserValid.reg_on.split(",")[0]
      ) {
        let temp = [];
        let total = 0;
        for (let j = 0; j < arr.length; j++) {
          if (
            arr[j].added_on.split(",")[0] ==
            curr_date.toLocaleString().split(",")[0]
            ) {
          temp.push(arr[j]);
          total = total + Number(arr[j].cost);
        }
      }
      final.push(temp.reverse());
      final_totals.push(total);

      curr_date.setDate(curr_date.getDate() - 1);
    }
    
    this.setState(
      {
        allData: final,
        allDataTotal: final_totals,
        user_mode: this.props.isUserValid.app_mode,
      },
      () => {
        console.log(this.state.user_mode, "****************************");
      }
    );
  };

  componentDidMount() {
    this.setState(
      {
        user_mode: this.props.isUserValid.app_mode,
        allCategories: this.props.categories,
        allExpenses: this.props.expenses,
      },
      () => {
        this.setExpense();
      }
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      this.setExpense();
      return false;
    } else return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props) {
      this.setState({
        user_mode: this.props.isUserValid.app_mode,
      });
    }
  }

  render() {
    return (
      <div className="expense-page">
        <Header title="Expenses" />

        <div className="expense-section">
          {this.state.allData.map(
            (data, index) =>
              data.length > 0 ? (
                <div className={`expense-container ${this.state.user_mode} `}>
                  <div className="date-header">
                    <h1>{data[0].added_on.split(",")[0]} </h1>{" "}
                  </div>
                  {data.map(item => (
                    <div
                      className="expense-div just-space"
                      style={{
                        backgroundColor: `${item.color}`,
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
                    <h1 className="head-18-bold">
                      {this.state.allDataTotal[index]}/-
                    </h1>
                  </div>
                </div>
              ) : null
          )}
        </div>

        {this.state.showAddExpense ? (
          <div className="dark-back just-center">
            <AddExpensePopup
              reload={() => this.setExpense()}
              categories={this.state.allCategories}
              user={this.props.isUserValid}
              addCategory={() => this.showAddCategoryPopup()}
              close={() => this.setState({ showAddExpense: false })}
            />
          </div>
        ) : this.state.showAddCategory ? (
          <div className="dark-back just-center">
            <AddCategoryPopup
              user={this.props.isUserValid}
              my_colors={this.state.available_colors}
              categories={this.state.allCategories}
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

export const AddExpensePopup = props => {
  const [ expense, setExpense ] = useState("");
  const [ selected_category, setSelected_category ] = useState("");
  const [ cost, setCost ] = useState("");
  const dispatch = useDispatch();

  const addNewExpense = async () => {
    if (expense.length < 1 || cost < 1 || !selected_category) {
      return alert("Invalid Data");
    }
    try {
      const getColor = props.categories.find(
        item => item.category == selected_category
      );
      const data = {
        user_id: props.user.user_id,
        expense_id: (Math.random() + 1).toString(36).substring(7),
        expense: expense,
        category: selected_category,
        cost: cost,
        color: getColor.color,
        added_on: GetCurrentDate(),
      };
      // console.log(data);

      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/add-expense`,
        data
      );
      dispatch(addExpense(data));
      props.close();

      props.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-note-popup">
      <div className="just-space">
        <h1>Add New Expense +</h1>
        <CloseButton
          callback={() => {
            props.close();
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
              value={expense}
              onChange={e => setExpense(e.target.value)}
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
              value={cost}
              onChange={e => setCost(e.target.value)}
              className="input-box head-16-semi"
              type="number"
            />
          </span>
        </div>

        <div className="d-flex-center m-yy-20">
          <label className="head-16-semi col-200" htmlFor="">
            Category
          </label>

          <select
            onChange={e => setSelected_category(e.target.value)}
            className="select-box head-16-semi"
          >
            <option value="" hidden>
              Select
            </option>

            {props.categories.map(item => (
              <option
                style={{ background: `${item.color}`, padding: "5px 0" }}
                value={item.category}
              >
                {item.category}
              </option>
            ))}
          </select>

          <span className="button-wrapper">
            <button
              onClick={() => {
                props.addCategory();
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
            <button
              onClick={() => addNewExpense()}
              className="primary_button head-16-semi"
            >
              Add Expense
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export const AddCategoryPopup = props => {
  const [ new_category, setNew_category ] = useState("");
  const [ selectedColor, setSelectedColor ] = useState("#F1F1F1");
  const dispatch = useDispatch();

  const addNewCategory = async () => {
    const categoryAlreadyInList = props.categories.find(
      item => item.category == new_category
    );

    const colorSelected = props.categories.find(
      item => item.color == selectedColor
    );

    if (!new_category || new_category.length < 2) {
      return alert("Invalid Data");
    } else if (categoryAlreadyInList) {
      return ErrorNotify("Category Already Exists");
    } else if (colorSelected) {
      return ErrorNotify("Select another color");
    }
    try {
      const data = {
        user_id: props.user.user_id,
        category_id: (Math.random() + 1).toString(36).substring(7),
        color: selectedColor,
        category: new_category,
        added_on: GetCurrentDate(),
      };
      // console.log(data);

      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/add-category`,
        data
      );
      dispatch(addCategory(data));
      props.close();
      InfoNotify("New Category Added");
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-note-popup">
      <div className="just-space">
        <h1>Add New Category +</h1>
        <CloseButton
          callback={() => {
            props.close();
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
              value={new_category}
              onChange={e => setNew_category(e.target.value)}
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
            {Colors.map(
              item =>
                props.categories.find(
                  item2 => item2.color == item.color
                ) ? null : (
                  <div
                    onClick={() => setSelectedColor(item.color)}
                    style={{ backgroundColor: `${item.color}` }}
                    className={
                      item.color == selectedColor ? (
                        "color-pick-selected"
                      ) : (
                        "color-pick"
                      )
                    }
                  />
                )
            )}
          </span>
        </div>

        <div className=" m-yy-20">
          <label className="head-16-semi col-200" htmlFor="" />
          <span className="button-wrapper">
            <button
              onClick={() => addNewCategory()}
              className="primary_button head-16-semi"
            >
              Add Category
            </button>
          </span>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesPage);

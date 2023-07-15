import axios from "axios";

export const getAllCategories = async () => {
  const data = await fetch(
    `${process.env.REACT_APP_HOST}/get-all-categories/${localStorage.UserId}`
  );
  const cats = await data.json();
  return cats;
};

export const getAllExpenses = async () => {
  try {
    const data = await fetch(
      `${process.env.REACT_APP_HOST}/get-all-expenses/${localStorage.UserId}`
    );
    const exp = await data.json();
    return exp.Expenses;
  } catch (error) {
    return [];
  }
};

export const addCategory = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_HOST}/add-category`,
    data
  );
};

export const addExpense = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_HOST}/add-expense`,
    data
  );
};

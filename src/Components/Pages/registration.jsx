import axios from "axios";
import React, { Component, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { isUserValid } from "../Services/Actions/[ AUTH ] userValidity";
import { useNavigate } from "react-router-dom";
import { getAllNotes } from "../Services/Actions/[ NOTES ]";
import { getAllPassword } from "../Services/Actions/[ PASSWORD ]";

import {
  getAllCategories,
  getAllExpenses,
} from "../Services/Actions/[ EXPENSE ]";
import { getAllTasks } from "../Services/Actions/[ TASKS ]";
import LoaderScreen from "../Containers/loader-screen";

class RegistrationWrapper extends Component {
  render() {
    return (
      <div className="registration-page just-center">
        <div className="">
          <h1
            style={{ textAlign: "center" }}
            className="head-24-bold color-primary"
          >
            Welcome to Note It Down
          </h1>
          <div className="registration-forms">
            <div className="login-page">
              <Login />
            </div>
            {/* <div className="divider" /> */}
            <div className="registration-page">
              <Registration />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [ isUserValid_, setUserValid ] = useState(false);
  const [ loading, _setLoading ] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    reset();
    try {
      // _setLoading(true);
      // _setLoading(false);

      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/login-user`,
        data
      );

      console.log(res.data);
      if (res.data.status == 200) {
        setUserValid(true);

        const data = await axios.get(
          `${process.env.REACT_APP_HOST}/get-all-notes/${res.data.data.user_id}`
        );
        let arr = data.data.notes.Notes;
        dispatch(
          isUserValid({
            loggedIn: true,
            name: res.data.data.name,
            email: res.data.data.email,
            reg_on: res.data.data.reg_on,
            user_id: res.data.data.user_id,
            app_mode: "light-mode",
          })
        );
        dispatch(getAllNotes(arr));
        dispatch(getAllPassword(res.data.data.user_id));
        dispatch(getAllCategories(res.data.data.user_id));
        dispatch(getAllExpenses(res.data.data.user_id));
        dispatch(getAllTasks(res.data.data.user_id));
      }

      navigate("/home");
    } catch (error) {
      _setLoading(false);

      console.log(error);
    }
  };

  return (
    <div className="login-section just-center">
      <form onSubmit={handleSubmit(onSubmit)} className="reg-form">
        <div className="input-div-2 m-yy-20">
          <label htmlFor="input-label-2">Username</label>
          <input
            {...register("email", { required: true })}
            type="text"
            className="input-box-2"
          />
        </div>
        <div className="input-div-2 m-yy-20">
          <label htmlFor="input-label-2">Password</label>
          <input
            type="text"
            {...register("password", { required: true })}
            className="input-box-2"
          />
        </div>
        <div className="input-div-2 m-yy-20">
          <input
            type="submit"
            className="head-16-semi primary_button "
            value="Login"
          />
        </div>
        <h3>
          Test Account
          <br />
          [username - test@mail.com] <br /> [password - 12345]
        </h3>
      </form>
    </div>
  );
};

const Registration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data, e) => {
    console.log(data);

    const object = {
      name: data.name,
      email: data.email,
      password: data.password,
      reg_on: new Date().toLocaleString(),
    };
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/register-user`,
        object
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registration-section just-center">
      <form className="reg-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-div-2 m-yy-20">
          <label htmlFor="input-label-2">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input-box-2"
          />
        </div>

        <div className="input-div-2 m-yy-20">
          <label htmlFor="input-label-2">Email</label>
          <input
            type="text"
            {...register("email", { required: true })}
            className="input-box-2"
          />
        </div>

        <div className="input-div-2 m-yy-20">
          <label htmlFor="input-label-2">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="input-box-2"
          />
        </div>

        <div className="input-div-2">
          <label htmlFor="input-label-2">Confirm Password</label>
          <input
            type="password"
            {...register("c_password", { required: true })}
            className="input-box-2"
          />
        </div>

        <div className="input-div-2 submit-btn m-yy-20">
          <input
            type="submit"
            className="head-16-semi primary_button"
            // onCLick={()=>}
            value="Register"
          />
        </div>
      </form>
    </div>
  );
};

export default RegistrationWrapper;

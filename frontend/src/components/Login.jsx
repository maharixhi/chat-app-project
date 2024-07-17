import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

import { BASE_URL } from "../main";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      navigate("/");
      dispatch(setAuthUser(res.data));

      // console.log(res)
      // console.log(user);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      userName: "",
      password: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 rounded-lg ">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2 ">
              <span className="text-base label label-text">Username</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2 ">
              <span className="text-base label label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Login
            </button>
          </div>
          <p className="text-center my-2">
            Don&apos;t have an account?
            <Link to="/signup"> Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

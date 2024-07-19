import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../main";

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleCheckbox = async (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.message) {
        navigate("/login");
        toast.success(res.data.message);
      }
      // console.log(res)
      // console.log(user);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
      gender: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 rounded-lg ">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2 ">
              <span className="text-base label label-text">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              type="text"
              placeholder="Enter Name"
              className="w-full input input-bordered h-10"
            />
          </div>
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
              <span className="text-base label label-text">Email address</span>
            </label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Enter Email"
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
            <label className="label p-2 ">
              <span className="text-base label label-text">
                Confrim Password
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              type="password"
              placeholder="Enter Password Again"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => {
                  handleCheckbox("male");
                }}
                // defaultChecked
                className="checkbox-md mx-2"
              />
            </div>

            <div className="flex items-center">
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => {
                  handleCheckbox("female");
                }}
                // defaultChecked
                className="checkbox-md mx-2"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              SignUp
            </button>
          </div>
          <p className="text-center my-2">
            Already have an account?
            <Link to="/login"> login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

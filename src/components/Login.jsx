import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUsers } from "../utils/userSlice";
import {BASE_URL} from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      },{
        withCredentials: true,
      });
      dispatch(addUsers(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="flex-grow flex items-center justify-center pt-16 pb-16">
      <div className="w-full max-w-md mx-auto p-4">
        <div className="bg-base-300 border border-gray-700 rounded-2xl shadow-2xl p-8">
          <h2 className="text-center text-3xl font-bold text-gray-100 mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Log in to connect with developers.
          </p>

          <form action="#" method="POST" className="space-y-6"  onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue-500 hover:text-blue-400 transition duration-200"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition duration-200"
              
              >
                Log In
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Not a member yet?{" "}
            <a
              href="#"
              className="font-semibold text-blue-500 hover:text-blue-400 transition duration-200"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;

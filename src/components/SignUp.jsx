import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUsers } from "../utils/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signupClick = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/signup",
        { name, emailId, password },
        {
          withCredentials: true,
        }
      );
      dispatch(addUsers(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data);
      console.log(err);
    }
  };
  return (
    <div className="flex-grow flex items-center justify-center pt-16 pb-16">
      <div className="w-full max-w-md mx-auto p-4">
        <div className="bg-base-300 border border-gray-700 rounded-2xl shadow-2xl p-8">
          {/* Heading */}
          <div className="mb-8">
            <h4 className="text-3xl font-bold text-gray-100 leading-tight text-center">
              Finding Dev's
            </h4>

            <p className="text-gray-400 mt-2">
              Create your account and start collaborating with developers.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="text-sm font-medium text-gray-300">Name</label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  value={name}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="text-sm font-medium text-gray-300">
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
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>
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

            {/* Error Message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Submit Button */}
            <div>
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition duration-200"
                onClick={signupClick}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-500 hover:text-blue-400 transition duration-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

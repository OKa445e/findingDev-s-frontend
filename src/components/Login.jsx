import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUsers } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUsers(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center pt-16 pb-16 mb-4">
      <div className="w-full max-w-md p-4">
        <div className="bg-base-300 border border-gray-700 rounded-2xl shadow-2xl p-8">
          <h2 className="text-center text-3xl font-bold text-gray-100 mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Log in to connect with developers.
          </p>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>

            {/* Error */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Email Login Button */}
            <button
              className="w-full py-3 bg-blue-600 rounded-lg text-white font-semibold"
              onClick={handleSubmit}
            >
              Log In
            </button>

            {/* OR Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-600" />
              <span className="mx-2 text-gray-400">OR</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            {/* Google Login */}
            <a
              href={BASE_URL + "/auth/google"}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-600 rounded-lg text-white bg-red-500 hover:bg-red-600"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </a>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Not a member yet?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-500 hover:text-blue-400"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

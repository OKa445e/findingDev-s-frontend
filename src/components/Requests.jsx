import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequests, rejectRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const reviewHandler = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(rejectRequests(_id));
      setToastMessage(res?.data.message || "Response Done Successfully");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data || []));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Connection's Requests
        </h1>

        {!requests || requests.length === 0 ? (
          <p className="text-center text-gray-400">No Requests found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {requests.map((req) => {
              const {
                _id,
                fromUserId: { name, about, age, gender, photoUrl } = {},
              } = req;

              return (
                <div
                  key={_id}
                  className="bg-white/5 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 p-4 flex flex-col items-center justify-between h-full transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Image on Top */}
                  <img
                    alt={name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg mb-4"
                    src={
                      photoUrl ||
                      "https://placehold.co/200x200/1f2937/ffffff?text=No+Image"
                    }
                  />

                  {/* Info Section */}
                  <div className="text-center flex-1">
                    <h2 className="font-bold text-lg text-white">{name}</h2>
                    {age && gender && (
                      <p className="text-gray-300">
                        {age}, {gender}
                      </p>
                    )}
                    <p className="mt-2 text-gray-400">{about}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between w-full mt-4">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
                      onClick={() => reviewHandler("accepted", req._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
                      onClick={() => reviewHandler("rejected", req._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Requests;

import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUsers } from "../utils/userSlice";
import axios from "axios";
import Loader from "./Loader";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  const { name = "", photoUrl = "", age = "", about = "", gender = "" } = user;

  const [nameEdit, setNameEdit] = useState(name);
  const [photoUrlEdit, setPhotoUrlEdit] = useState(photoUrl);
  const [ageEdit, setAgeEdit] = useState(age);
  const [aboutEdit, setAboutEdit] = useState(about);
  const [genderEdit, setGenderEdit] = useState(gender);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async () => {
    if (!nameEdit || !photoUrlEdit || !ageEdit || !aboutEdit || !genderEdit) {
      setError("All fields are required.");
      return;
    }
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          name: nameEdit,
          photoUrl: photoUrlEdit,
          age: ageEdit,
          about: aboutEdit,
          gender: genderEdit,
        },
        { withCredentials: true }
      );

      dispatch(addUsers(res?.data?.data));
      setShowToast(true);

      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center items-stretch gap-10 my-10 px-6 mb-20">
        {/* Left Side - Edit Form */}
        <div className="flex-1 max-w-md p-4 h-full">
          <div className="border border-gray-700 rounded-2xl shadow-2xl p-8 h-full flex flex-col space-y-6">
            <h2 className="text-center text-3xl font-bold text-gray-100 mb-2">
              Edit Profile
            </h2>

            {/* Name Input */}
            <div>
              <label className="text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                required
                value={nameEdit}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setNameEdit(e.target.value)}
              />
            </div>

            {/* Age Input */}
            <div>
              <label className="text-sm font-medium text-gray-300">Age</label>
              <input
                type="number"
                required
                value={ageEdit}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setAgeEdit(e.target.value)}
              />
            </div>

            {/* Photo URL Input */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                Photo URL
              </label>
              <input
                type="text"
                required
                value={photoUrlEdit}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPhotoUrlEdit(e.target.value)}
              />
            </div>

            {/* About Input */}
            <div>
              <label className="text-sm font-medium text-gray-300">About</label>
              <textarea
                required
                value={aboutEdit}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setAboutEdit(e.target.value)}
              />
            </div>

            {/* Gender Select */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                Gender
              </label>
              <select
                required
                value={genderEdit}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setGenderEdit(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Error Message */}
            <p className="text-red-500">{error}</p>

            {/* Save Button */}
            <button
              type="button"
              className="w-full py-3 rounded-lg font-semibold text-white bg-blue-600 
              hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              onClick={handleSubmit}
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* Right Side - Live Preview */}
        <div className="flex-1 max-w-sm h-full">
          <UserCard
            user={{
              name: nameEdit,
              photoUrl: photoUrlEdit,
              age: ageEdit,
              about: aboutEdit,
              gender: genderEdit,
            }}
            isEditProfile={true}
          />
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

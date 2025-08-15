import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUsers } from "../utils/userSlice";
import axios from "axios";
import Loader from "./Loader";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  // Safely extract values
  const name = user?.name || "";
  const photoUrl = user?.photoUrl || "";
  const age = user?.age || "";
  const about = user?.about || "";
  const gender = user?.gender || "";
  
  // Normalize skills to always be an array
  const skills = (() => {
    const rawSkills = user?.skills;
    if (!rawSkills) return [];
    if (Array.isArray(rawSkills)) return rawSkills;
    if (typeof rawSkills === 'string') {
      try {
        const parsed = JSON.parse(rawSkills);
        return Array.isArray(parsed) ? parsed : [rawSkills];
      } catch {
        return [rawSkills];
      }
    }
    return [String(rawSkills)];
  })();

  // Always call hooks (same order every render)
  const [nameEdit, setNameEdit] = useState(name);
  const [photoUrlEdit, setPhotoUrlEdit] = useState(photoUrl);
  const [ageEdit, setAgeEdit] = useState(age);
  const [aboutEdit, setAboutEdit] = useState(about);
  const [genderEdit, setGenderEdit] = useState(gender);
  const [skillsEdit, setSkillsEdit] = useState(skills);
  const [skillsInput, setSkillsInput] = useState(skills.join(", "));
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(photoUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (user) {
      setNameEdit(user.name || "");
      setPhotoUrlEdit(user.photoUrl || "");
      setPreviewUrl(user.photoUrl || "");
      setAgeEdit(user.age || "");
      setAboutEdit(user.about || "");
      setGenderEdit(user.gender || "");
      // Normalize skills for the edit form
      const normalizedSkills = (() => {
        const rawSkills = user?.skills;
        if (!rawSkills) return [];
        if (Array.isArray(rawSkills)) return rawSkills;
        if (typeof rawSkills === 'string') {
          try {
            const parsed = JSON.parse(rawSkills);
            return Array.isArray(parsed) ? parsed : [rawSkills];
          } catch {
            return [rawSkills];
          }
        }
        return [String(rawSkills)];
      })();
      
      setSkillsEdit(normalizedSkills);
      setSkillsInput(normalizedSkills.join(", "));
    }
  }, [user]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid image file (JPEG, JPG, or PNG)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setError("");

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle skills input change
  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setSkillsInput(value);
    const arr = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setSkillsEdit(arr);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!nameEdit || !ageEdit || !aboutEdit || !genderEdit) {
      setError("Name, Age, About, and Gender are required.");
      return;
    }
    setError("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("name", nameEdit);
      formData.append("age", ageEdit);
      formData.append("about", aboutEdit);
      formData.append("gender", genderEdit);
      // Save skills as individual strings, not as JSON array
      skillsEdit.forEach((skill, index) => {
        formData.append(`skills[${index}]`, skill);
      });

      // Add file if selected, otherwise keep existing photo URL
      if (selectedFile) {
        formData.append("photo", selectedFile);
      }

      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(addUsers(res?.data?.data));
      setShowToast(true);
      setSelectedFile(null); // Reset file selection

      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setIsUploading(false);
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

            {/* Skills Input */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                Skills
              </label>
              <input
                type="text"
                value={skillsInput}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white 
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSkillsChange}
                placeholder="e.g. JavaScript, React, Node.js"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                Profile Photo
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 
                  file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={handleFileChange}
                />
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-400 mt-1">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            {/* Error Message */}
            <p className="text-red-500">{error}</p>

            {/* Save Button */}
            <button
              type="button"
              disabled={isUploading}
              className={`w-full py-3 rounded-lg font-semibold text-white 
              ${
                isUploading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              }`}
              onClick={handleSubmit}
            >
              {isUploading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>

        {/* Right Side - Live Preview */}
        <div className="flex-1 max-w-sm h-full">
          <UserCard
            user={{
              name: nameEdit,
              photoUrl: previewUrl, // Use preview URL for live preview
              age: ageEdit,
              about: aboutEdit,
              gender: genderEdit,
              skills: skillsEdit,
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
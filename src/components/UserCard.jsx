import axios from "axios";
import React, { useState } from "react";
import { FaVenusMars } from "react-icons/fa";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, isEditProfile = false }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  if (!user) return null;

  const { _id, photoUrl, name, age, about, gender, skills: rawSkills } = user;
  
  // Normalize skills to always be an array of individual strings
  const skills = (() => {
    if (!rawSkills) return [];
    if (Array.isArray(rawSkills)) return rawSkills;
    if (typeof rawSkills === 'string') {
      try {
        const parsed = JSON.parse(rawSkills);
        return Array.isArray(parsed) ? parsed : [rawSkills];
      } catch {
        // If it's not JSON, treat as a single skill
        return [rawSkills];
      }
    }
    return [String(rawSkills)];
  })();

  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(userId));
      setToastMessage(res?.data.message || "Response Done Successfully");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {}
  };

  return (
    <>
      <main className="flex-grow flex items-center justify-center pt-16 pb-16 bg-transparent">
        <div className="w-full max-w-sm mx-auto">
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl transform transition duration-300 hover:scale-[1.02] border border-gray-700 bg-transparent">
            {/* Background Image */}
            {photoUrl && (
              <img
                src={photoUrl}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

            {/* Text Overlay */}
            <div className="absolute bottom-0 p-5 w-full text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{name}</h2>
                {age && <span className="text-lg">{age}</span>}
              </div>

              {gender && (
                <div className="flex items-center gap-2 mt-1 text-gray-300 text-sm">
                  <FaVenusMars className="text-pink-400" />
                  <span className="capitalize">{gender}</span>
                </div>
              )}

              {about && <p className="mt-3 text-sm leading-relaxed">{about}</p>}

              {/* Skills Section */}
              {skills && skills.length > 0 && (
                <div className="mt-3">
                  <span className="font-semibold text-sm text-gray-200">
                    Skills
                  </span>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {Array.isArray(skills) ? (
                      skills.map((skill, idx) => (
                        <li
                          key={idx}
                          className="px-3 py-1 bg-white/20 rounded-full text-xs text-white border border-white/30"
                        >
                          {skill}
                        </li>
                      ))
                    ) : (
                      // Handle case where skills might be a string or other format
                      <li className="px-3 py-1 bg-white/20 rounded-full text-xs text-white border border-white/30">
                        {typeof skills === 'string' ? skills : JSON.stringify(skills)}
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Action Buttons - Hidden in Edit Profile */}
              {!isEditProfile && (
                <div className="flex justify-around mt-5 pb-2">
                  <button
                    className="w-24 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 cursor-pointer text-white font-semibold transition shadow-lg"
                    onClick={() => handleRequest("ignored", _id)}
                  >
                    Ignore
                  </button>
                  <button
                    className="w-28 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 cursor-pointer text-white font-semibold transition shadow-lg"
                    onClick={() => handleRequest("interested", _id)}
                  >
                    Interested
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
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

export default UserCard;

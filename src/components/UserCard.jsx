import React from "react";
import { FaVenusMars } from "react-icons/fa";

const UserCard = ({ user, isEditProfile = false }) => {
  if (!user) return null;

  const { photoUrl, name, age, about, gender } = user;

  return (
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

            {about && (
              <p className="mt-3 text-sm leading-relaxed">
                {about}
              </p>
            )}

            {/* Action Buttons - Hidden in Edit Profile */}
            {!isEditProfile && (
              <div className="flex justify-around mt-5 pb-2">
                <button className="w-24 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 cursor-pointer text-white font-semibold transition shadow-lg">
                  Ignore
                </button>
                <button className="w-28 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 cursor-pointer text-white font-semibold transition shadow-lg">
                  Interested
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserCard;

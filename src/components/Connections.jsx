import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connect);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data || []));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  const filteredConnections = connections.filter((conn) =>
    conn.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        Connections
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* No Results */}
      {filteredConnections.length === 0 ? (
        <p className="text-center text-gray-400">No connections found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredConnections.map((connection) => {
            const { _id, name, about, gender, age, photoUrl, skills: rawSkills } =
              connection;
            
            // Normalize skills to always be an array
            const skills = (() => {
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

            return (
              <div
                key={_id}
                className="flex flex-col md:flex-row items-center md:items-start p-6 rounded-2xl bg-white/5 backdrop-blur-lg shadow-lg border border-white/10 
                transform transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/40 hover:border-indigo-400"
              >
                {/* Profile Image */}
                <div className="relative group">
                  <img
                    alt={name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-indigo-500 shadow-lg 
                    group-hover:shadow-indigo-400/60 transition-all duration-300"
                    src={
                      photoUrl ||
                      "https://placehold.co/200x200/1f2937/ffffff?text=No+Image"
                    }
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></span>
                </div>

                {/* Info */}
                <div className="text-left md:ml-4 flex-1 mt-3 md:mt-0">
                  <h2 className="font-bold text-lg text-white">{name}</h2>
                  {age && gender && (
                    <p className="text-gray-300">
                      {age}, {gender}
                    </p>
                  )}
                  <p className="mt-2 text-gray-400">{about}</p>

                  {/* Skills */}
                  {skills && skills.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full transition-transform duration-200 hover:scale-105"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Button */}
                <Link to={`/chat/${_id}`} className="mt-4 md:mt-0 md:ml-4">
                  <button className="relative overflow-hidden bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg transition duration-300">
                    <span className="relative z-10">Chat</span>
                    <span className="absolute inset-0 bg-indigo-700 opacity-0 hover:opacity-20 transition duration-300"></span>
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Connections;

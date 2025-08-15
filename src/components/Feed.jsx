import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const userFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userFeed();
  }, []);

  if (!feed) return null;
  if (feed.length === 0)
    return <p className="text-center my-20 text-gray-400">No new Users found.</p>;
  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;

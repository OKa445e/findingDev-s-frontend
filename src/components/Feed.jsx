import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const userFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(res.data);

      dispatch(addFeed(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userFeed();
  }, []);
  return (
   feed && (
    <div className="flex justify-center my-10">
    <UserCard user = {feed?.data[0]}/>
   </div>
   )
  );
};

export default Feed;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiCheckFill } from "react-icons/ri";
import { TbPlus } from "react-icons/tb";
import "../../css/Bookmark.css";

function FollowBut({ userEmail }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [user, setUser] = useState(null);

  const fetchFollowData = async () => {
    try {
      const response = await axios.get(`http://192.168.0.209:8090/following/`);
      const data = response.data;

      if (data.find((e) => e.email === userEmail)) {
        setIsFollowed(true);
      } else {
        setIsFollowed(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const responseUserId = await axios.get(
        "http://192.168.0.209:8090/user/me"
      );
      const alldata = responseUserId.data;
      const responseUser = await axios.get(
        `http://192.168.0.209:8090/post/email/${alldata.email}`
      );
      const user = responseUser.data;
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFollowData();

    fetchUserData();
  }, [userEmail]);

  const handleFollowClick = async () => {
    if (!user) {
      // 로그인되지 않은 경우, 팔로우를 할 수 없도록 예외처리합니다.
      console.log("로그인이 필요합니다.");
      return;
    }

    try {
      const url = `http://192.168.0.209:8090/follow/${userEmail}`;
      const response = await axios.post(url, {
        is_follow: !isFollowed,
      });

      setIsFollowed((prevIsFollowed) => !prevIsFollowed);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="follow_button"
      onClick={handleFollowClick}
      style={{
        backgroundColor: isFollowed ? "#adb5bd" : "#252121",
        color: "white",
      }}
    >
      {isFollowed ? "팔로잉" : "팔로우"}
      {isFollowed ? <RiCheckFill /> : <TbPlus />}
    </button>
  );
}

export default FollowBut;

import React from "react";
import Post from "./components/Detail/Post";
import PostSide from "./components/Detail/PostSide";
import Header from "./components/Layout/postHeader";
import { useLocation } from "react-router-dom";
import "./css/Detail.css";

export default function Detail() {
  const location = useLocation();

  return (
    <div className="main">
      <div className="body">
        <Header />
        <PostSide user={location.state} />
        <Post user={location.state} />
      </div>
    </div>
  );
}

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
import CommentInputLine from "./CommentInputLine";
import ContentShowMore from "./ContentShowMore";
import Like from "./Like";
import Moment from "react-moment";
import "moment/locale/ko";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const Content = ({ user, postData, post }) => {
  const [commentData, setCommentData] = useState([]);
  const [likeCnt, setLikeCnt] = useState(post.likeCnt);
  const [authUser, setAuthUser] = useState([]);

  const refreshFunction = (newComment) => {
    //부모의 Comments state값을 업데이트하기위한 함수
    setCommentData(commentData.concat(newComment)); //자식들한테 값을 전달받아 Comments값 업데이트
  };

  // get 호출을 통해 commentData 조회
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://192.168.0.209:8090/comment/${post.post_id}`)
        .then((response) => setCommentData(response.data))

        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  // 게시글 생성 시간
  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    return <Moment fromNow>{startTime}</Moment>;
  };
  const [isAdmin, setIsAdmin] = useState(
    Boolean(localStorage.getItem("token") === "admin")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://192.168.0.209:8090/user/me")
        .then((response) => {
          setAuthUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const intervalId = setInterval(() => {
      setIsAdmin(Boolean(localStorage.getItem("token") === "admin"));
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const movePage = useNavigate();
  function goBack() {
    movePage(-1);
  }
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "center",
        my: "50px",
        mx: "auto",
        maxWidth: 1200,
        boxShadow: 5,
        borderRadius: 3,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={`${user.user.proImage}`}
            ait={user.user.nickname}
            onClick={goBack}
          />
        }
        title={
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 20,
              fontFamily: "default",
              color: "#4f4f4f",
            }}
          >
            {post.nickname}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="auto"
        image={`${post.image_url}`}
        alt="feed"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Like
            user={user}
            authUser={authUser}
            isLoggedIn={isLoggedIn}
            feedNum={post.post_id}
            likeCnt={likeCnt}
            setLikeCnt={setLikeCnt}
          />
        </IconButton>
        &nbsp;&nbsp;
        <Typography
          sx={{
            fontFamily: "default",
            fontSize: "20",
            color: "#4f4f4f",
          }}
        >
          <b>{likeCnt}명</b>이 좋아합니다
        </Typography>
      </CardActions>
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "default",
            color: "#4f4f4f",
          }}
        >
          <strong>{post.nickname}</strong>
          &nbsp;&nbsp;
          {post.content ? <ContentShowMore content={post.content} /> : null}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "default",
            color: "#4f4f4f",
          }}
        >
          <Comment
            user={user}
            authUser={authUser}
            isLoggedIn={isLoggedIn}
            commentData={commentData}
            setCommentData={setCommentData}
            refreshFunction={refreshFunction}
            feedData={postData}
            feedNum={post.post_id}
          />
        </Typography>
      </CardContent>
      <CardContent>
        <Typography
          sx={{
            fontFamily: "default",
            fontSize: "12px",
            color: "#4f4f4f",
          }}
        >
          {displayCreatedAt(post.created_at)} •{" "}
          <time>{new Date(post.created_at).toDateString()}</time>
        </Typography>
        <CommentInputLine
          user={user}
          authUser={authUser}
          isLoggedIn={isLoggedIn}
          commentData={commentData}
          setCommentData={setCommentData}
          refreshFunction={refreshFunction}
          feedNum={post.post_id}
        />
      </CardContent>
    </Card>
  );
};

export default Content;

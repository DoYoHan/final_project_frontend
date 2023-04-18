import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import axios from "axios";

// 게시글 사이드 네비게이션(Link 태그 사용)
const PostSide = (user) => {
  const [postData, setPostData] = useState([]);
  const email = user.user.userEmail;
  const getPost = async () => {
    const res = await axios.get(
      `http://192.168.0.209:8090/post/email/${email}`
    );
    // console.log(res.data);
    if (res.data) {
      setPostData(res.data); //리스트 추가
      // console.log(res.data);
    } else {
      console.log(res); //에러
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  console.log(postData);
  console.log(user);
  return (
    <div className="SideBlock">
      <div>
        {postData &&
          postData.map((el, index) => {
            return (
              <Link to={`${index}`} spy={true} smooth={true}>
                <span>
                  <Card
                    sx={{
                      maxWidth: 100,
                      borderRadius: 2,
                      boxShadow: 5,
                      my: "5px",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="auto"
                        image={`${el.image_url}`}
                        alt={`${el.nickname}`}
                      />
                    </CardActionArea>
                  </Card>
                </span>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default PostSide;

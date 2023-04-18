import { React, useState, useEffect } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// 좋아요 기능 구현
const Like = ({ authUser, isLoggedIn, feedNum, likeCnt, setLikeCnt }) => {
  const [isLiked, setIsLiked] = useState(false);
  const fetchData = async () => {
    await axios
      .get(`http://192.168.0.209:8090/like/${feedNum}`)
      .then((response) => {
        const a = response.data;
        if (a.length === 1) setIsLiked(true);
        else setIsLiked(false);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleLikeClick = async () => {
    if (!!authUser) {
      // 좋아요를 취소하는 경우
      if (isLiked) {
        await axios
          .post(`http://192.168.0.209:8090/post/like/${feedNum}`)
          .then((response) => {
            setIsLiked(false);
            setLikeCnt(likeCnt - 1);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // 좋아요를 추가하는 경우
        await axios
          .post(`http://192.168.0.209:8090/post/like/${feedNum}`, {
            is_liked: true,
          })
          .then((response) => {
            setIsLiked(true);
            setLikeCnt(likeCnt + 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return isLoggedIn ? (
    isLiked ? (
      <FavoriteIcon onClick={handleLikeClick} />
    ) : (
      <FavoriteBorderIcon onClick={handleLikeClick} />
    )
  ) : null;
};

export default Like;

import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, CardActionArea } from "@mui/material";
import "../../css/Bookmark.css";
import axios from "axios";

export default function Bookmark({userEmail}) {
  const [FollowerData, setFollowerData] = useState([]);
  const [followingData, setfollowingData] = useState([]);

  //팔로우/팔로워 버튼 상태값
  const [followerGrid, setFollowerGrid] = useState(true); // true값을줌 새로고침하거나 페이지 열때 가장 먼저 보임
  const [followGrid, setFollowGrid] = useState(false);
  const [isFollowerActive, setisFollowerActive] = useState(true); //버튼 클릭 시 아래에 밑줄
  const [isFollowingActive, setisFollowingActive] = useState(false); //버튼 클릭 시 아래에 밑줄

  //팔로우,팔로워 정보 받아오는곳
  useEffect(() => {
    axios.get(`http://192.168.0.209:8090/follower/${userEmail}`).then((response) => {
      const followerdata = response.data;
      setFollowerData(followerdata);
    });

    axios.get(`http://192.168.0.209:8090/following/${userEmail}`).then((response) => {
      const followingdata = response.data;
      setfollowingData(followingdata);
    });
  }, []);

  const followerButtonClick = () => {
    setFollowerGrid(true);
    setFollowGrid(false);
    setisFollowerActive(!isFollowerActive);
    setisFollowingActive(false);
  };

  const followButtonClick = () => {
    setFollowerGrid(false);
    setFollowGrid(true);
    setisFollowingActive(!isFollowingActive);
    setisFollowerActive(false);
  };
  


  console.log(FollowerData)

  return (
    <div>
      {/* 버튼 */}
      <div className="button_set">
        <button
          className="button"
          style={{ borderBottom: isFollowerActive ? "solid #dcdcdc" : "none" }}
          onClick={followerButtonClick}
        >
          Follower
        </button>
        <button
          className="button"
          style={{ borderBottom: isFollowingActive ? "solid #dcdcdc" : "none" }}
          onClick={followButtonClick}
        >
          Following
        </button>
      </div>
      {/* 팔로워 이미지 카드 */}
      <Grid container spacing={4} style={{ margin: 10 }} />
      <Grid item xs={12} sm={12} md={12} />
      {followerGrid && (
        <Grid
          container
          spacing={4}
          style={{
            margin: 10,
            padding: "200px",
            marginTop: -130,
            marginBottom: 200,
          }}
        >
          {FollowerData.map((FollowerData, index) => (
            <Grid item xs={10} sm={10} md={2} key={index}>
              <Card sx={{ maxWidth: 200 }}>
                <CardActionArea disableTouchRipple>
                  <CardMedia
                    component="img"
                    height="120"
                    image={FollowerData.proImage}
                    alt="qwerty"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {FollowerData.nickname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {FollowerData.introduce}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* 팔로우 이미지카드 */}
      {followGrid && (
        <Grid
          container
          spacing={4}
          style={{
            margin: 10,
            padding: "200px",
            marginTop: -130,
            marginBottom: 200,
          }}
        >
          {followingData.map((followingData, index) => (
            <Grid item xs={10} sm={10} md={2} key={index}>
              <Card sx={{ maxWidth: 200 }}>
                <CardActionArea disableTouchRipple>
                  <CardMedia
                    component="img"
                    height="120"
                    image={followingData.proImage}
                    alt="qwerty"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {followingData.nickname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {followingData.introduce}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

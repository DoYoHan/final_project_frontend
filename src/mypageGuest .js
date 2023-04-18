import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import MpImgSliderGuest from "./components/MyPage/MpImgSliderGuest";
import MypageBio from "./components/MyPage/Bio";
import MypageDashboard from "./components/MyPage/Dashboard";
import Bookmark from "./components/MyPage/Bookmark";
import Login from "./login";
import Footer from "./components/Layout/footer";
import FollowBut from "./components/MyPage/FollowBut";
import "./css/mypage.css";
import "./css/MyPageHeader.css";
import axios from "axios";

// 마이페이지 게스트 페이지입니다
export default function MypageGuest() {
  const [postAllData, setPostAllData] = useState();
  const [userMeData, setUserMeData] = useState();
  const [isAdmin, setIsAdmin] = useState(
    Boolean(localStorage.getItem("token") === "admin")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    axios
      .get("http://192.168.0.209:8090/user/me")
      .then((response) => {
        setUserMeData(response.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://192.168.0.209:8090/post/all")
      .then((response) => {
        setPostAllData(response.data);
      })
      .catch((err) => console.log(err));

    const intervalId = setInterval(() => {
      setIsAdmin(Boolean(localStorage.getItem("token") === "admin"));
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function handleLoginSuccess() {
    setIsAdmin(true);
    setIsLoggedIn(true);
  }

  // 4개중 1개만 true로 설정하여서 클릭한 1개만 나오도록 설정
  const [showMypageImgslider, setShowMypageImgslider] = useState(true);
  const [showMypageBio, setShowMypageBio] = useState(false);
  const [showMypageDashboard, setShowMypageDashboard] = useState(false);
  const [ShowMyPageBookmark, setShowMyPageBookmark] = useState(false);

  const onlyShowMypageImgslider = () => {
    setShowMypageImgslider(true);
    setShowMypageBio(false);
    setShowMypageDashboard(false);
    setShowMyPageBookmark(false);
  };
  const onlyShowMypageBio = () => {
    setShowMypageImgslider(false);
    setShowMypageBio(true);
    setShowMypageDashboard(false);
    setShowMyPageBookmark(false);
  };
  const onlyShowMypageDashboard = () => {
    setShowMypageImgslider(false);
    setShowMypageBio(false);
    setShowMypageDashboard(true);
    setShowMyPageBookmark(false);
  };
  const onlyShowMyPageBookmark = () => {
    setShowMypageImgslider(false);
    setShowMypageBio(false);
    setShowMypageDashboard(false);
    setShowMyPageBookmark(true);
  };
  // 현재 활성화된 버튼 상태
  const [activeButton, setActiveButton] = useState("게시물");
  // 게시물 버튼 클릭시 실행할 함수
  const buttonClickImgslider = () => {
    setActiveButton("게시물");
    onlyShowMypageImgslider();
  };
  // 정보 버튼 클릭시 실행할 함수
  const buttonClickMypageBio = () => {
    setActiveButton("정보");
    onlyShowMypageBio();
  };
  // 통계 버튼 클릭시 실행할 함수
  const buttonClickDashboard = () => {
    setActiveButton("통계");
    onlyShowMypageDashboard();
  };
  // 즐겨찾기 버튼 클릭시 실행할 함수
  const buttonClickFavorites = () => {
    setActiveButton("즐겨찾기");
    onlyShowMyPageBookmark();
  };

  const movePage = useNavigate();

  function goHome() {
    movePage("/");
  }
  function goMemberShip() {
    movePage("/membership");
  }
  function goMypage() {
    const postMe = postAllData.filter(
      (postAll) => postAll.email === userMeData.email
    );
    movePage("/mypage", {
      state: {
        category: postMe.category,
        content: postMe.content,
        created_at: postMe.created_at,
        postEmail: postMe.email,
        image_url: postMe.image_url,
        likeCnt: postMe.likeCnt,
        modified_at: postMe.modified_at,
        post_id: postMe.post_id,
        birth: userMeData.birth,
        userEmail: userMeData.email,
        followerCnt: userMeData.followerCnt,
        followingCnt: userMeData.followingCnt,
        gender: userMeData.gender,
        introduce: userMeData.introduce,
        nickname: userMeData.nickname,
        password: userMeData.password,
        phone: userMeData.phone,
        proImage: userMeData.proImage,
        role: userMeData.role,
        visitCnt: userMeData.visitCnt,
        website: userMeData.website,
      },
    });
  }
  function goHelpUser() {
    movePage("/HelpUser");
  }
  function goAdmin() {
    movePage("/Admin");
  }

  const location = useLocation();
  const likeCnt = location.state.likeCnt;
  const userEmail = location.state.userEmail;
  const followerCnt = location.state.followerCnt;
  const followingCnt = location.state.followingCnt;
  const introduce = location.state.introduce;
  const nickname = location.state.nickname;
  const proImage = location.state.proImage;
  const visitCnt = location.state.visitCnt;

  return (
    <div>
      {/* === 헤드 부분 === */}
      <div id="SubHeaderLayout">
        <div onClick={goHome} className="SubLogo">
          PHOPO
        </div>
        <nav className="NavMenu">
          <Login onLoginSuccess={handleLoginSuccess} />
          {isLoggedIn ? null : (
            <button onClick={goMemberShip} className="NavMenuTitle">
              회원가입
            </button>
          )}
          {isLoggedIn && (
            <button onClick={goMypage} className="NavMenuTitle">
              마이페이지
            </button>
          )}
          {isLoggedIn && (
            <button onClick={goHelpUser} className="NavMenuTitle">
              고객지원
            </button>
          )}
          {isAdmin && (
            <button onClick={goAdmin} className="NavMenuTitle">
              관리자페이지
            </button>
          )}
        </nav>
        <br />
      </div>
      <div className="mypage_menu">
        <p className="mypage_id">
          {nickname} <FollowBut userEmail={userEmail} />
        </p>
        <Button
          variant={activeButton === "게시물" ? "dark" : "outline-dark"}
          size="lg"
          className="button_active"
          onClick={buttonClickImgslider}
        >
          게시물
        </Button>
        <Button
          variant={activeButton === "정보" ? "dark" : "outline-dark"}
          size="lg"
          className="button_active"
          onClick={buttonClickMypageBio}
        >
          정보
        </Button>
        <Button
          variant={activeButton === "통계" ? "dark" : "outline-dark"}
          size="lg"
          className="button_active"
          onClick={buttonClickDashboard}
        >
          통계
        </Button>
        <Button
          variant={activeButton === "즐겨찾기" ? "dark" : "outline-dark"}
          size="lg"
          className="button_active"
          onClick={buttonClickFavorites}
        >
          팔로워
        </Button>
      </div>
      {/* === 내용 부분 === */}
      <div>
        {showMypageImgslider && (
          <MpImgSliderGuest userEmail={userEmail} location={location} />
        )}
        {showMypageBio && (
          <MypageBio
            isLoggedIn={isLoggedIn}
            proImage={proImage}
            introduce={introduce}
            userEmail={userEmail}
          />
        )}
        {showMypageDashboard && (
          <MypageDashboard
            visitCnt={visitCnt}
            nickname={nickname}
            likeCnt={likeCnt}
            userEmail={userEmail}
            followerCnt={followerCnt}
            followingCnt={followingCnt}
          />
        )}
        {ShowMyPageBookmark && <Bookmark userEmail={userEmail} />}
      </div>
      <Footer />
    </div>
  );
}

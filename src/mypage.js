import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import MypageImgslider from "./components/MyPage/MypageImgslider";
import MypageBio from "./components/MyPage/Bio";
import MypageDashboard from "./components/MyPage/Dashboard";
import Bookmark from "./components/MyPage/Bookmark";
import Login from "./login";
import Footer from "./components/Layout/footer";
import "./css/mypage.css";
import "./css/MyPageHeader.css";

// 마이페이지 유저 페이지입니다
export default function Mypage() {
  const [isAdmin, setIsAdmin] = useState(
    Boolean(localStorage.getItem("token") === "admin")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
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

  const location = useLocation();
  const likeCnt = location.state.likeCnt;
  const userEmail = location.state.userEmail;
  const followerCnt = location.state.followerCnt;
  const followingCnt = location.state.followingCnt;
  const introduce = location.state.introduce;
  const nickname = location.state.nickname;
  const proImage = location.state.proImage;
  const visitCnt = location.state.visitCnt;

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

  const movePage = useNavigate();

  function goHome() {
    movePage("/");
  }
  function goMemberShip() {
    movePage("/membership");
  }
  function goMypage() {
    movePage(0);
  }
  function goHelpUser() {
    movePage("/HelpUser");
  }
  function goAdmin() {
    movePage("/Admin");
  }

  return (
    <div>
      <>
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
          {/* 유저에 따라서 이름이 변경 */}
          <p className="mypage_id">{nickname}</p>
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
        <br />
      </>
      {/* === 내용 부분 === */}
      <div>
        {showMypageImgslider && (
          <MypageImgslider userEmail={userEmail} location={location} />
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

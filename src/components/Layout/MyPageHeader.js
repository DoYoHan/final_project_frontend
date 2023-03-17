import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/MyPageHeader.css";
import "../../css/mypage.css";
import Login from "../../login";

export default function MyPageHeader() {
  const movePage = useNavigate();

  function goMypage() {
    movePage("/mypage");
  }
  function goBoard() {
    movePage("/Board");
  }
  function goAdmin() {
    movePage("/Admin");
  }
  function goHome() {
    movePage("/");
  }
  function goBio() {
    movePage("/Bio");
    // // 권한이 있는 경우 Bio
    // // 권한이 없는 경우 OtherBio
    // if (사용자 === 권한있는 사용자){
    //   movePage("/Bio");
    // } else {
    //   movePage("/OtherBio")
    // }
  }

  function goUpload() {
    movePage("/Upload");
  }
  const userName = "Han Yongjae";

  return (
    <>
      {/* 고정 부분 */}
      <div id="SubHeaderLayout">
        <div onClick={goHome} id="SubLogo">
          PHOPO
        </div>
        <nav className="NavMenu">
          <Login />
          <button onClick={goMypage} className="NavMenuTitle">
            마이페이지
          </button>
          <button onClick={goBoard} className="NavMenuTitle">
            고객지원
          </button>
          <button onClick={goAdmin} className="NavMenuTitle">
            관리자페이지
          </button>
        </nav>
        <br />
      </div>
      {/* 유저에 따라서 이름이 변경되야함 */}
      <div className="mypage_menu">
        <a href="http://localhost:3000/mypage">
          <h3 className="mypage_id">{userName}</h3>
        </a>
        <button className="button_active" onClick={goMypage}>
          게시물
        </button>
        <button className="button_active" onClick={goBio}>
          정보
        </button>
        <button className="button_active" onClick={goUpload}>
          업로드
        </button>
      </div>
    </>
  );
}

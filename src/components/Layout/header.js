import React from "react";
import "../../css/MainHeader.css";
import { useNavigate } from "react-router-dom";
import Login from "../../login";

export default function Header() {
  const movePage = useNavigate();

  function goMypage() {
    movePage("/mypage");
  }
  function goMembership() {
    movePage("/membership");
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
  return (
    <header>
      <div>
        <nav className="NavMenu">
          <Login />
          <button onClick={goMembership} className="NavMenuTitle">
            회원가입
          </button>
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

        <div onClick={goHome}>
          <h1 className="Title">P H O P O</h1>
        </div>
      </div>
    </header>
  );
}

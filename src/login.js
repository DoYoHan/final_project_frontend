import React, { useState } from "react";
import Modal from "react-modal";
import "./css/login.css";
import axios from "axios";

Modal.setAppElement("#root");

export default function Login() {
  const [showModal1, setShowModal1] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const onEmail = (e) => {
    setEmail(e.target.value);
  };

  const onPassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.0.209:8090/user", {
        email,
        password,
      });
      if (response.status === 200) {
        //로그인 성공
        handleCloseModal1();
      }
    } catch (error) {
      //로그인 실패
      setLoginError("이메일이나 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleOpenModal1 = () => {
    setShowModal1(true);
  };
  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal1} className="NavMenuTitle">
        로그인
      </button>
      <Modal
        isOpen={showModal1}
        onRequestClose={handleCloseModal1}
        className="login_modal"
      >
        <h2 className="login">로그인</h2>
        <form onSubmit={onSubmit}>
          <div className="login_form">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              value={email}
              required
              placeholder="이메일 입력"
              onChange={onEmail}
            />
          </div>
          <div className="login_form">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              value={password}
              required
              placeholder="비밀번호 입력"
              onChange={onPassword}
            />
          </div>
          <br />
          <button className="login_button">로그인</button>
          {loginError && <div className="login-error">{loginError}</div>}
          <br />
          <button onClick={handleCloseModal1} className="login_button">
            닫기
          </button>
          <br />
          <button
            onClick={() => (window.location.href = "/MemberShip")}
            className="login_button"
          >
            회원가입
          </button>
          <Naver />
        </form>
      </Modal>
      <button
        onClick={() => (window.location.href = "/MemberShip")}
        className="NavMenuTitle"
      >
        회원가입
      </button>
    </div>
  );
}

import React from "react";
import "../../css/mypage.css";
import Header from "../Layout/MyPageHeader";
import Footer from "../Layout/footer";
// 버튼을 통해서만 편집이 가능하기 때문에
// 권한이 없는 사용자일 경우 버튼을 가리고
// 권한이 있는 사용자일 경우 버튼을 표시하여 구분할 예정

// 권한이 없는 버전
export default function OtherBio() {
  // ==== 이미지 부분 ====
  const image = "https://pbs.twimg.com/media/DumtB0bUwAA2k7U.jpg";
  //  ==== 텍스트 부분 ====
  const text = `압구정동 찻집에서 만난 백다흠 씨는 인근 로데오 거리에 어울리는 상큼한
  모습으로 나타났다. 김훈 고은 공지영 신경숙 은희경 윤대녕 김인숙 김경욱
  김영하 등 내로라하는 문인 60여 명을 렌즈로 담아냈으니 자신감이 툭
  배어나올 것 같은데 정반대였다. 천천히 신중하게 말하는 스타일인 그는
  “사진이 좋다는 얘기가 퍼지면서 의뢰가 많아진 거 아니냐”고 물어야
  마지못해 “입소문이 재미있고 무섭던데요”라고 했다. “백 작가한테 안
  찍으면 일류가 아니라는 말 나오겠다”고 하자 “그렇게 생각해주시면 너무
  고맙지요”라고 가까스로 대답했다. 그러면서 “사람 찍는 게 가장
  어려워요”라고 했다.`;

  return (
    <div>
      <Header />
      <div className="profile_author">
        <div>
          {/* 이미지 부분 */}
          <img src={image} alt="zz" />
        </div>
        <br />
        <h2>Han Yongjae</h2>
        <br />
        {/* 소개글 부분 */}
        <p>
          <div id="BioEditDiv">{text}</div>
        </p>
      </div>
      <Footer />
    </div>
  );
}

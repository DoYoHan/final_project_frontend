import React, { useState, useRef } from "react";
import "../../css/mypage.css";
import Header from "../Layout/MyPageHeader";
import Footer from "../Layout/footer";
import { EditOutlined, CameraOutlined } from "@ant-design/icons";
// 버튼을 통해서만 편집이 가능하기 때문에
// 권한이 없는 사용자일 경우 버튼을 가리고
// 권한이 있는 사용자일 경우 버튼을 표시하여 구분할 예정
export default function Bio() {
  // ==== 이미지 부분 ====
  const [image, setImage] = useState(
    "https://pbs.twimg.com/media/DumtB0bUwAA2k7U.jpg"
  );
  const fileInput = useRef(null);
  const [file, setFile] = useState("");

  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시 기본이미지로 변경
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  //  ==== 텍스트 부분 ====
  const [text, setText] =
    useState(`압구정동 찻집에서 만난 백다흠 씨는 인근 로데오 거리에 어울리는 상큼한
  모습으로 나타났다. 김훈 고은 공지영 신경숙 은희경 윤대녕 김인숙 김경욱
  김영하 등 내로라하는 문인 60여 명을 렌즈로 담아냈으니 자신감이 툭
  배어나올 것 같은데 정반대였다. 천천히 신중하게 말하는 스타일인 그는
  “사진이 좋다는 얘기가 퍼지면서 의뢰가 많아진 거 아니냐”고 물어야
  마지못해 “입소문이 재미있고 무섭던데요”라고 했다. “백 작가한테 안
  찍으면 일류가 아니라는 말 나오겠다”고 하자 “그렇게 생각해주시면 너무
  고맙지요”라고 가까스로 대답했다. 그러면서 “사람 찍는 게 가장
  어려워요”라고 했다.`);
  const [editable, setEditable] = useState(false);
  //   editOn은 input상태로 만들기
  //   editOff는 text상태로 만들기
  const editToggle = () => {
    setEditable(!editable);
  };
  //   handleChange는 input 상태일 때 내용의 변화를 감지해서 text를 바꾸어준다.
  //   이게 없으면 input 상태인데도 수정이 되지 않는다
  const handleChange = (e) => {
    setText(e.target.value);
  };
  //   handleKeyDown은 enter키를 눌렀을 때 입력을 중지하는 함수다
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditable(!editable);
    }
  };

  return (
    <div>
      <Header />
      <div className="profile_author">
        <div>
          {/* 이미지 부분 */}
          <img src={image} alt="zz" />
          {/* 이미지 편집 버튼 */}
          <div>
            <CameraOutlined
              onClick={() => {
                fileInput.current.click();
              }}
              style={{ fontSize: "40px" }}
            />
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/jpg,image/png,image/jpeg"
            name="profile_img"
            onChange={onChange}
            ref={fileInput}
          />
        </div>
        <br />
        <h2>Han Yongjae</h2>
        <br />
        {/* 소개글 부분 */}
        <p>
          {/* editable의 값에 따라 input 혹은 text를 리턴해준다 */}
          {editable ? (
            <textarea
              type="text"
              value={text}
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyDown}
              id="BioEditTextarea"
            />
          ) : (
            <div id="BioEditDiv">{text}</div>
          )}
          {/* 편집 On/Off 버튼*/}
          <EditOutlined
            onClick={() => editToggle()}
            style={{
              fontSize: "40px",
            }}
          />
        </p>
      </div>
      <Footer />
    </div>
  );
}

import React, { useState } from "react";
import Modal from "react-modal";
import { addAnnouncement } from "../../utils/api";
import "../../css/Announcement_Modal.css";
Modal.setAppElement("#root");

function Announcement_Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setContent("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await addAnnouncement(title, content, token); // 수정된 부분
      alert("게시글이 등록되었습니다.");
      handleCloseModal(); // 모달을 닫습니다.
      window.location.reload(); // 게시글 목록을 다시 불러옵니다.
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button className="announcement_up" onClick={handleOpenModal}>
        등록
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="announcement-modal"
      >
        <form onSubmit={handleSubmit}>
          <h2>공지사항</h2>
          <label htmlFor="announcement-title">제목</label>
          <input
            type="text"
            id="announcement-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label htmlFor="announcement-content">내용</label>
          <textarea
            id="announcement-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            wrap="soft"
          />
          <button type="submit">등록</button>
          <button type="button" onClick={handleCloseModal}>
            취소
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Announcement_Modal;

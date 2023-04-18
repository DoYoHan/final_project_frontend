import BoardList from "../Help/Board/BoardList";
import { useState, useEffect } from "react";
import BoardPagination from "../Help/Board/BoardPagination";
import { getAnnouncements, deleteAnnouncement } from "../../utils/api";
import Announcement_Modal from "./Announcement_Modal";

export default function Announcement() {
  const [contentInfo, setContentInfo] = useState([]);
  // 페이징 부분
  const [page, setPage] = useState(1); //페이지
  const limit = 10; // posts가 보일 최대한의 갯수
  const offset = (page - 1) * limit; // 시작점과 끝점을 구하는 offset

  const postsData = (posts) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnnouncements();
      setContentInfo(data);
    };
    fetchData();
  }, []);

  const handleUpdateContentInfo = async () => {
    const data = await getAnnouncements();
    setContentInfo(data);
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    const token = localStorage.getItem("token");
    try {
      await deleteAnnouncement(announcementId, token);
      await handleUpdateContentInfo();
      alert("게시글이 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };
  return (
    <div className="BoardContentDiv">
      {/* === 게시판 헤드 부분 === */}
      <div className="BoardContentHeader">
        <span className="BoardContentHeaderId">번호</span>
        <span className="BoardContentHeaderTitle">제목</span>
        <span className="BoardContentHeaderCreateAt">작성일</span>
        <span className="BoardContentHeaderName">수정일</span>
      </div>
      <hr />
      {/* === 게시판 내용 부분 === */}

      <BoardList
        items={postsData(contentInfo)}
        showDeleteButton={true}
        handleDeleteItem={handleDeleteAnnouncement}
      />

      {/* === Pagination 부분 === */}
      <BoardPagination
        limit={limit}
        page={page}
        totalPosts={contentInfo.length}
        setPage={setPage}
      />
      <div className="announcement-up">
        <Announcement_Modal />
      </div>
    </div>
  );
}

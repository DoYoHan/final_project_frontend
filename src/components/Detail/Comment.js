import { React, useState, useEffect } from "react";
import axios from "axios";
// import Like from "./Like";
// import GetFormattedDate from "../utils/FormatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import "moment/locale/ko";

const Comment = ({
  user,
  authUser,
  isLoggedIn,
  feedNum,
  commentData,
  setCommentData,
}) => {
  const [showFullComments, setShowingFullComments] = useState(false);

  const comment = commentData.filter((comment) => comment.post_id === feedNum);

  async function deleteComment(comment_id) {
    await axios
      .delete(`http://192.168.0.209:8090/comment/${comment_id}`)
      .then(() =>
        setCommentData(
          commentData.filter((comment) => comment.comment_id !== comment_id)
        )
      )
      .catch((error) => console.error(error));
  }
  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    return <Moment fromNow>{startTime}</Moment>;
  };

  return comment?.length >= 1 ? (
    <div>
      {comment?.length > 2 ? (
        <h5
          className="post__comments__count mt-1"
          onClick={() => setShowingFullComments(!showFullComments)}
        >
          {" "}
          {!showFullComments ? "View all" : "Hide most of the "}{" "}
          {comment.length?.toLocaleString()} comments
        </h5>
      ) : (
        <h5 className="post__comments__count">Comments</h5>
      )}
      <div className="commentSection">
        {comment &&
          comment
            ?.slice(0, !showFullComments ? 4 : comment.length)
            ?.map((el, i) => {
              return (
                el.post_id === feedNum && (
                  <div className="comment" key={i}>
                    <span className="id">
                      <strong>{el.nickname}</strong>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {el.content}
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>
                      {displayCreatedAt(el.created_at)}
                      <span className="commentImage">
                        {/* 로그인 한 유저 id와 댓글의 id가 같아야지만 삭제가 가능 */}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {isLoggedIn && el?.email === authUser.email ? (
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => deleteComment(el.comment_id)}
                          />
                        ) : null}
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </div>
                )
              );
            })}
      </div>
    </div>
  ) : null;
};

export default Comment;

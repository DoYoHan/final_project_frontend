import { React, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const CommentInputLine = ({
  user,
  authUser,
  isLoggedIn,
  commentData,
  setCommentData,
  refreshFunction,
  feedNum,
  setComment,
}) => {
  const [commentValue, setCommentValue] = useState("");
  const onChange = (e) => {
    setCommentValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (commentValue === "") return;
    addComment(feedNum, commentValue);
  };
  const addComment = async (feedNum, commentValue) => {
    axios
      .post(`http://192.168.0.209:8090/comment/${feedNum}`, {
        content: commentValue,
      })
      .then((response) => {
        console.log(response.data);
        refreshFunction(response.data);
        setCommentValue("");
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <InputGroup className="lg">
        <Form.Control
          placeholder="조언과 정보는 힘이 됩니다..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={commentValue}
          onChange={onChange}
          disabled={!isLoggedIn}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          type="submit"
          style={{ height: "35px", marginRight: "15px" }}
        >
          Comment
        </Button>
      </InputGroup>
    </form>
  );
};

export default CommentInputLine;

import React from "react";
import { useState, useRef, useMemo } from "react";

// 게시글 text의 수를 제한하고 넘으면 더보기 버튼 구현
const ContentShowMore = ({ content }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const textLimit = useRef(30);

  const commenter = useMemo(() => {
    const shortReview = content.slice(0, textLimit.current);

    if (content.length > textLimit.current) {
      if (isShowMore) {
        return content;
      }
      return shortReview;
    }
    return content;
  }, [content, isShowMore]);

  return (
    <span>
      {commenter}
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span onClick={() => setIsShowMore(!isShowMore)}>
        {content.length > textLimit.current && (isShowMore ? "" : "...더보기")}
      </span>
    </span>
  );
};

export default ContentShowMore;

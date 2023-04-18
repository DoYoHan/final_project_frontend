import React, { useState } from "react";
import Modal from "react-modal";
import "../../css/Preview.css";

Modal.setAppElement("#root");

function PreviewModal({
  isOpen,
  previewImage,
  onCloseModal,
  onUpload,
  images,
  text,
  setText,
  category,
  setCategory,
}) {
  const [currentPreviewImage, setCurrentPreviewImage] = useState(
    previewImage || null
  );

  const handleUpload = async () => {
    const uploadedImage = await uploadImage(previewImage);
    onUpload({ image: uploadedImage, text, category });
    onCloseModal();
    setText(""); // text state 초기화
  };

  const handleCloseModal = () => {
    onCloseModal();
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const uploadImage = async (image) => {
    // TODO: 이미지 업로드 로직 구현
    return image;
  };

  const handleClickImage = (image) => {
    setCurrentPreviewImage(URL.createObjectURL(image));
  };

  return (
    <Modal
      className="preview_main"
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={{
        overlay: { zIndex: 1000 },
        content: { zIndex: 1000 },
      }}
    >
      <div className="modal_title">새 게시물 작성하기</div>
      <div className="modal_category">
        <label>주제선정</label>
        <select onChange={handleCategoryChange} value={category}>
          <option value="">선택하세요</option>
          <option value="Home">Home</option>
          <option value="Animal">Animal</option>
          <option value="Food">Food</option>
          <option value="Sports">Sports</option>
          <option value="Nature">Nature</option>
          <option value="Person">Person</option>
        </select>
      </div>
      <div className="modal_image">
        {images.map((image, index) => (
          <div key={index}>
            <img
              className="preview_img"
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              onClick={() => handleClickImage(image)}
            />
          </div>
        ))}
      </div>
      <div className="modal_text_wrapper">
        <textarea
          type="text"
          className="modal_text"
          value={text}
          onChange={handleTextChange}
        />
        <div className="modal_buttons_wrapper">
          <div className="modal_buttons">
            <button onClick={handleUpload}>업로드</button>
            <button onClick={handleCloseModal}>취소</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PreviewModal;

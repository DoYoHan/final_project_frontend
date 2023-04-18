import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { RiImageAddLine } from "react-icons/ri";
import PreviewModal from "./PreviewModal";

function ImageUploader({ onUpload }) {
  const [images, setImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      setImages([...images, ...acceptedFiles]);
      setModalIsOpen(true);
    },
    [images]
  );

  const { getRootProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/gif",
    multiple: false,
  });

  const handleUpload = async () => {
    const uploadedImages = await uploadImages(images);
    onUpload(uploadedImages, text, category);
    setImages([]);
    setModalIsOpen(false);
  };

  const handleCloseModal = () => {
    setImages([]);
    setModalIsOpen(false);
  };

  const uploadImages = async (image) => {
    return image;
  };

  return (
    <div className="image-uploader">
      <div {...getRootProps()} className="dropzone">
        <RiImageAddLine />
      </div>
      {modalIsOpen && (
        <PreviewModal
          isOpen={modalIsOpen}
          onCloseModal={handleCloseModal}
          onUpload={handleUpload}
          images={images}
          text={text}
          setText={setText}
          setCategory={setCategory}
        />
      )}
    </div>
  );
}

export default ImageUploader;

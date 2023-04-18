import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import { Link } from "react-router-dom";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/mousewheel";
import "../../css/MypageSlider.css";
import "../../css/Imguploadbtn.css";

export default function MypageImgslider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [userAll, setUserAll] = useState([]);

  const handleUpload = async (newImages, text, category) => {
    const newImageUrls = newImages.map((image) => URL.createObjectURL(image));

    const formData = new FormData();
    newImages.forEach((image) => {
      formData.append("file", image);
    });
    formData.append("content", text);
    formData.append("category", category);

    try {
      await axios.post("http://192.168.0.209:8090/post/add", formData);
      // 이미지 업로드 후 fetchImages 함수를 호출하여 이미지 URL을 가져옵니다.
      fetchImages();
    } catch (error) {
      console.error(error);
    }
    console.log(fetchImages);
  };

  const fetchImages = async () => {
    try {
      const responseEmail = await axios.get(
        "http://192.168.0.209:8090/user/me"
      );
      const userAll = responseEmail.data;

      setUserAll(userAll);

      const responseImages = await axios.get(
        `http://192.168.0.209:8090/post/email/${userAll.email}`
      );

      const urls = responseImages.data.map((post) => post);
      setImageUrls(urls);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (imageUrl) => {
    try {
      // 클라이언트에서 해당 이미지의 URL 정보를 삭제합니다.
      const newImageUrls = imageUrls.filter((url) => url !== imageUrl);
      setImageUrls(newImageUrls);

      // 서버에서 해당 이미지를 삭제합니다.
      await axios.delete(`http://192.168.0.209:8090/post/${imageUrl.post_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteImage = (index) => {
    const imageUrl = imageUrls[index];
    if (window.confirm("삭제하시겠습니까?")) {
      handleDelete(imageUrl);
    }
  };

  return (
    <>
      {/* 업로드 버튼 */}
      <button className="floating">
        <ImageUploader onUpload={handleUpload} />
      </button>

      <div className="MySwiperTop">
        <Swiper
          spaceBetween={10}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }} //자동으로 사진 넘겨주는 슬라이드기능
          effect="fade"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay, EffectFade]}
          className="mySwiper2"
        >
          {/* 업로드된 이미지 보여주기 */}
          {imageUrls.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <div className="image-container">
                <div className="images_button">
                  <button className="delete_button">
                    <RiDeleteBin6Line
                      onClick={() => handleDeleteImage(index)}
                    />
                  </button>
                </div>
                <Link
                  to="/detail"
                  state={{
                    userEmail: userAll.email,
                    introduce: userAll.introduce,
                    nickname: userAll.nickname,
                    proImage: userAll.proImage,
                  }}
                >
                  <img src={imageUrl.image_url} alt={`Imagefile ${index}`} />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* 하단 미리보기 이미지 부분 */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={1}
        slidesPerView={8}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {/* 업로드된 이미지 보여주기 */}
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <img src={imageUrl.image_url} alt={`Imagefile ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

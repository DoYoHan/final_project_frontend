import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from 'swiper';
import Test from './Mainhome/ImgCard.json' //테스트 데이터


// import 스와이퍼 스타일
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/mousewheel"
import "../css/MypageSlider.css"


// 적용할 모듈
import { FreeMode, Navigation, Thumbs, Autoplay, Mousewheel } from "swiper";

export default function App() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        spaceBetween={10}
        loop={true}
        autoplay = {{delay : 3000 }} //자동으로 사진 넘겨주는 슬라이드기능
        effect="fade"
        thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
        modules={[FreeMode, Navigation, Thumbs, Autoplay,EffectFade]}
        className="mySwiper2"
      >
        {/* 사진 데이터를 ImgCard.json에서 가져옴 */}
        {Test.itemData.map((item)=>(
        <SwiperSlide key={item.img}>
          
            <img 
            src={`${item.img}?w=1500&fit=crop&auto=format`}
            alt={item.title}
            />
          
        </SwiperSlide>
        ))}
      </Swiper>

      {/* 하단 미리보기 이미지 부분 */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={1}
        slidesPerView={10}
        freeMode={true}
        mousewheel={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
        className="mySwiper"
      >

        {/* 사진 데이터를 ImgCard.json에서 가져옴  */}
        {Test.itemData.map((item)=>(
        <SwiperSlide key={item.img}>
          
            <img 
            src={`${item.img}?w=400&fit=crop&auto=format`}
            alt={item.title}
            />
          
        </SwiperSlide>
        ))}
        
      </Swiper>
    </>
  );
}
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import bnr from "../assets/images/bner/1.jpg";
import bnr1 from "../assets/images/bner/2.jpg";
import bnr2 from "../assets/images/bner/3.jpg";
import bnr3 from "../assets/images/bner/4.jpg";
import bnr4 from "../assets/images/bner/4.jpg";
import bnr5 from "../assets/images/bner/5.jpg";
import bnr6 from "../assets/images/bner/6.jpg";
import bnr7 from "../assets/images/bner/7.jpg";
import bnr8 from "../assets/images/bner/8.jpg";

export default function Banner() {
  const images = [bnr, bnr1, bnr3, bnr2, bnr4, bnr5, bnr6, bnr7, bnr8];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-[200px] sm:h-[300px] md:h-[450px] lg:h-[600px] xl:h-[700px]">
              <img
                src={img}
                alt={`slide-${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
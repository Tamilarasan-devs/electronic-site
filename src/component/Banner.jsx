import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import bnr from "../assets/images/tv-repair.jpg";
import bnr1 from "../assets/images/tv-repair-1.jpg";
import bnr2 from "../assets/images/tv-repair-2.jpg";
import bnr3 from "../assets/images/tv-repair-3.jpg";

export default function Banner() {
  const images = [bnr, bnr1, bnr3, bnr2];

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
        className="w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[650px]"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
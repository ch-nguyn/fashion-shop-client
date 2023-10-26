import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useState } from "react";
import HomeBtn from "./HomeBtn";

export interface ISliderProps {}

interface SliderItem {
  title: string;
  slide: string;
}

export default function Slider() {
  const [sliderContent, setSliderContent] = useState<SliderItem[]>([
    { title: "Mid Season Sale.", slide: "bg-slider-1" },
    { title: "Best Sellers.", slide: "bg-slider-2" },
    { title: "Outwear Picks.", slide: "bg-slider-3" },
    { title: "Seasonal Offers.", slide: "bg-slider-4" },
  ]);
  return (
    <div className="slider">
      <Swiper
        slidesPerView={1}
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1200}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderContent.map((slider: SliderItem) => (
          <SwiperSlide className="" key={Math.random()}>
            <SliderItem slide={slider.slide} title={slider.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const SliderItem = (props: SliderItem) => {
  return (
    <>
      <div
        className={`h-[70vh] max-lg:bg-right max-sm:h-[50vh] bg-cover relative bg-center ${props.slide}`}
      ></div>
      <div className="absolute max-lg:px-5 text-white max-sm:w-full max-sm:ml-20 top-1/2 left-1/3 translate-x-[-50%] translate-y-[-50%]">
        <h2 className="text-[74px] max-sm:text-4xl max-lg:text-5xl font-semibold tracking-[-2px] leading-[83px] mb-2 animate-[slider_1.5s_ease-in-out]">
          {props.title}
        </h2>
        <div>
          <p className="text-xl leading-[29px] max-sm:text-xs  max-lg:text-sm tracking-wide animate-[slider_1.8s_ease-in-out]">
            Stock up on sportswear and limited edition collections on our
          </p>
          <p className="text-xl leading-[29px] max-sm:text-xs max-lg:text-sm tracking-wide animate-[slider_1.8s_ease-in-out]">
            awesome mid-season sale.
          </p>
        </div>
        <HomeBtn />
      </div>
    </>
  );
};

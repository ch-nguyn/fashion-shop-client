import * as React from "react";
import { useState } from "react";
import {
  AboutFeaturedItem,
  IAboutFeaturedItem,
} from "../components/about/AboutFeaturedItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useNavigate } from "react-router-dom";

export interface IAboutPageProps {}

interface IPerson {
  img: string;
  name: string;
  role: string;
}

interface ISlide {
  img: string;
  text: string;
}

export default function AboutPage(props: IAboutPageProps) {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState<IAboutFeaturedItem[]>([
    {
      icon: "cart-shopping",
      title: "WooCommerce",
    },
    {
      icon: "laptop-mobile",
      title: "Fully Responsive",
    },
    {
      icon: "earth-americas",
      title: "SEO Optimized",
    },
    {
      icon: "wand-magic-sparkles",
      title: "Trendy Design",
    },
    {
      icon: "computer-mouse-scrollwheel",
      title: "One-Click Import",
    },
    {
      icon: "desktop",
      title: "Retina Ready",
    },
  ]);
  const [personInfo, setPersonInfo] = useState<IPerson[]>([
    {
      img: "https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/home-main-team-1.jpg",
      name: "Chien Nguyen",
      role: "Creative Director",
    },
    {
      img: "https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/home-main-team-5.jpg",
      name: "Huu Chien",
      role: "Designer",
    },
    {
      img: "https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/home-main-team-4.jpg",
      name: "Nguyen Huu Chien",
      role: "System Admin",
    },
  ]);
  const [slides, setSlide] = useState<ISlide[]>([
    {
      img: "https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/New-Trends-In-Responsive-Design.jpg",
      text: "new trends in responsive design",
    },
    {
      img: "https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/Band-x-Brand-Campaign.jpg",
      text: "Band x Brand Campaign",
    },
    {
      img: "https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/Taking-Street-Art-To-The-Next-Level.jpg",
      text: "Taking Street Art To The Next Level",
    },
    {
      img: "https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/The-App-Of-The-Future.jpg",
      text: "The App Of The Future",
    },
    {
      img: "https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/Urban-Streets-Campaign.jpg",
      text: "Urban Streets Campaign",
    },
    {
      img: "https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/Winter-Collection-2016.jpg",
      text: "Winter Collection 2016",
    },
    {
      img: "https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/Digitalizing-Street-Fashion.jpg",
      text: "Digitalizing Street Fashion",
    },
    {
      img: "https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/BodyShape-Workout-App-Presentation.jpg",
      text: "BodyShape Workout App Presentation",
    },
    {
      img: "https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/Cityscapes-Skylines-1.jpg",
      text: "Cityscapes Skylines 1",
    },
  ]);
  return (
    <div className="mt-[85px]">
      <div className="text-7xl capitalize bg-center bg-cover bg-no-repeat text-white  h-[50vh] bg-hero-about bg-fixed flex justify-center items-center">
        about us
      </div>
      <div className="py-28 mx-auto max-w-[1200px] flex gap-10">
        {featured.slice(0, 4).map((item: IAboutFeaturedItem) => (
          <AboutFeaturedItem
            icon={item.icon}
            key={Math.random()}
            title={item.title}
          />
        ))}
      </div>

      <div className="bg-[#f9f9f9] py-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-28 text-center">
            <h2 className="text-3xl font-semibold mb-6">
              Tell the world about yourself.
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip.
            </p>
          </div>

          <div className="flex gap-8">
            {personInfo.map((person: IPerson) => (
              <div className="basis-1/3 text-center" key={Math.random()}>
                <img
                  className="w-full object-contain mb-9"
                  src={person.img}
                  alt=""
                />
                <h3 className="font-semibold text-2xl mb-2">{person.name}</h3>
                <p className="opacity-60 mb-5">{person.role}</p>
                <div className="flex gap-3 text-2xl justify-center">
                  <i className="cursor-pointer hover:text-fresh duration-300 opacity-60 fa-brands fa-square-facebook"></i>
                  <i className="cursor-pointer hover:text-fresh duration-300 opacity-60 fa-brands fa-square-twitter"></i>
                  <i className="cursor-pointer hover:text-fresh duration-300 opacity-60 fa-brands fa-square-dribbble"></i>
                  <i className="cursor-pointer hover:text-fresh duration-300 opacity-60 fa-brands fa-vimeo"></i>
                  <i className="cursor-pointer hover:text-fresh duration-300 opacity-60 fa-brands fa-square-instagram"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-28  bg-[url('https://suprema.qodeinteractive.com/wp-content/uploads/2016/01/about-us-parallax-image-2.jpg')] bg-fixed bg-cover bg-no-repeat">
        <div className="max-w-[1200px] mx-auto flex justify-evenly items-center">
          <div className="text-white basis-1/4 text-center">
            <h3 className="font-semibold text-7xl mb-4">250</h3>
            <p>Happy Clients</p>
          </div>
          <div className="text-white basis-1/4 text-center">
            <h3 className="font-semibold text-7xl mb-4">18</h3>
            <p>Awards Won</p>
          </div>
          <div className="text-white basis-1/4 text-center">
            <h3 className="font-semibold text-7xl mb-4">120</h3>
            <p>Cups Of Coffee</p>
          </div>
          <div className="text-white basis-1/4 text-center">
            <h3 className="font-semibold text-7xl mb-4">27</h3>
            <p>Projects Finished</p>
          </div>
        </div>
      </div>

      <div>
        <Swiper
          centeredSlides={true}
          loop={true}
          slidesPerView={4}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {slides.map((slide: ISlide) => (
            <SwiperSlide className="" key={Math.random()}>
              <div className="relative cursor-pointer text-white group/slide text-center">
                <img className="w-full object-cover" src={slide.img} alt="" />
                <div className="w-full h-full absolute top-0 left-0 bg-black opacity-0 duration-500 group-hover/slide:opacity-70"></div>
                <h3 className="capitalize font-semibold text-xl translate-x-[-50%] translate-y-[-50%] absolute top-1/2 left-1/2 opacity-0 group-hover/slide:opacity-100 duration-500 delay-200">
                  {slide.text}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mx-auto max-w-[1200px] py-28 flex flex-wrap flex-col">
        <div className="basis-1/2 flex gap-20">
          {featured.slice(0, 3).map((feature: IAboutFeaturedItem) => (
            <div className=" flex" key={Math.random()}>
              <i
                className={`fa-regular fa-${feature.icon} basis-1/6 text-4xl mr-5 opacity-60`}
              ></i>
              <div className="">
                <p className="capitalize mb-3 font-semibold">{feature.title}</p>
                <p className="opacity-70 text-sm leading-[26px] text-justify">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="basis-1/2 flex gap-20 mt-20">
          {featured.slice(3, 6).map((feature: IAboutFeaturedItem) => (
            <div className=" flex" key={Math.random()}>
              <i
                className={`fa-regular fa-${feature.icon} basis-1/6 text-4xl mr-5 opacity-60`}
              ></i>
              <div className="">
                <p className="capitalize mb-3 font-semibold">{feature.title}</p>
                <p className="opacity-70 text-sm leading-[26px] text-justify">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

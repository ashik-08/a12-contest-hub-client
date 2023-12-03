// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./sliderStyles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import useContest from "../../hooks/useContest";
import SectionTitle from "../../SectionTitle/SectionTitle";

const BestCreator = () => {
  const [, popular] = useContest();

  return (
    <section>
      <SectionTitle subHeading="--- See our ---" heading="best creators" />
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: -200,
          depth: 600,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {popular?.slice(0, 3).map((contest) => (
          <SwiperSlide key={contest._id}>
            <img
              className=" rounded-lg"
              src={contest.created_by_photo}
              alt=""
            />
            <div className="mt-2 space-y-1 px-2 xl:text-lg font-medium">
              <p className="text-sub-head">
                Creator:{" "}
                <span className="text-special text-lg xl:text-xl">
                  {contest.created_by_name}
                </span>
              </p>
              <p className="text-sub-head">
                Created Contest:{" "}
                <span className="text-special text-lg xl:text-xl">
                  {contest?.contest_name}
                </span>
              </p>
              <p className="text-sub-head">
                Description:{" "}
                <span className="text-special text-lg xl:text-xl">
                  {contest?.description}
                </span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BestCreator;

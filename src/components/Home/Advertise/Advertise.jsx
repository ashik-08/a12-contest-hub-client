// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import useContest from "../../hooks/useContest";
import SectionTitle from "../../SectionTitle/SectionTitle";

const Advertise = () => {
  const [allContest] = useContest("");

  return (
    <section>
      <SectionTitle subHeading="--- See our ---" heading="contest winners" />
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {allContest?.map(
          (contest) =>
            contest.winner_email && (
              <SwiperSlide key={contest._id}>
                <img
                  className="2xl:max-h-[90vh]"
                  src={contest.contest_image}
                  alt=""
                />
                <div className="absolute inset-0 slider-img-gradient"></div>
                <div className="absolute transform -translate-y-1/2 left-2 top-1/2 md:left-16 lg:left-20 space-y-1 md:space-y-1.5 lg:space-y-2.5 xl:space-y-4">
                  <img
                    className="max-w-[60px] md:max-w-[80px] xl:max-w-[120px]"
                    src={contest.winner_photo}
                    alt="creator's-img"
                  />
                  <p className="text-special md:text-lg lg:text-xl xl:text-2xl font-semibold">
                    Winner: {contest.winner_name}
                  </p>
                  <p className="text-head text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">
                    Contest: {contest.contest_name}
                  </p>
                  <p className="text-head text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">
                    Attempted: {contest.participation_count}
                  </p>
                  <p className="max-w-xs lg:max-w-sm hidden md:flex text-blue-gray-100 md:text-base lg:text-base md:font-medium">
                    ContestHub is a dynamic and user-friendly Project Contest
                    Creation Platform designed to foster creativity, engage
                    communities, and celebrate talent across various domains.
                    Whether you&apos;re organizing a design competition, coding
                    challenge, or any other creative contest, ContestHub is your
                    go-to destination for seamless contest creation and
                    efficient winner selection.
                  </p>
                </div>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </section>
  );
};

export default Advertise;

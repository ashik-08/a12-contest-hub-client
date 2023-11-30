import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="pt-24 md:pt-28 lg:pt-32 xl:pt-36">
      <div className="hero min-h-[83vh] bg-hero-bg bg-cover bg-no-repeat rounded-xl">
        <div className="hero-overlay bg-opacity-40 rounded-xl"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl md:text-5xl font-bold">
              Unleash Your Talents, Join Exciting Contests!
            </h1>
            <p className="mb-5">
              Discover a world of opportunities and showcase your skills.
              Participate in diverse contests ranging from business strategy to
              creative writing. Elevate your profile, win amazing prizes, and
              connect with like-minded individuals. Your journey to success
              begins here!
            </p>
            <Link to="/all-contest" className="btn glass">
              All Contest
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

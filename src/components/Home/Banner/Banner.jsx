import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useContest from "../../hooks/useContest";
import ContestCard from "../../../pages/AllContestPage/ContestCard";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allContest] = useContest(searchQuery);

  return (
    <section className="pt-24 md:pt-28 lg:pt-32 xl:pt-36">
      <div className="hero min-h-[83vh] bg-hero-bg bg-cover bg-no-repeat rounded-xl">
        <div className="hero-overlay bg-opacity-40 rounded-xl"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <div className="w-60 md:w-72 mx-auto">
              <Input
                label="Search by Type"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                className="text-white"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <h1 className="my-5 text-4xl md:text-5xl font-bold">
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
      {/* card */}
      {searchQuery && (
        <div className="mt-24 md:mt-28 lg:mt-32 xl:mt-36">
          <ContestCard contest={allContest} />
        </div>
      )}
    </section>
  );
};

export default Banner;

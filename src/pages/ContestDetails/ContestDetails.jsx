import { Helmet } from "react-helmet-async";
import Container from "../../components/Container/Container";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import DeadlineCounter from "./DeadlineCounter";
import { Link, useLoaderData, useParams } from "react-router-dom";

const ContestDetails = () => {
  const { id } = useParams();
  const {
    contest_name,
    contest_image,
    participation_count,
    description,
    contest_price,
    prize_money,
    contest_deadline,
    winner_name,
    winner_email,
    winner_photo,
  } = useLoaderData();

  const now = new Date().getTime();
  const deadlineDate = new Date(contest_deadline).getTime();
  const difference = deadlineDate - now;

  return (
    <section>
      <Helmet>
        <title>Contest Hub | Contest Details</title>
      </Helmet>
      <Container>
        {/* contest deadline */}
        <SectionTitle
          subHeading="--- Hurry up ---"
          heading="contest deadline"
        />
        <DeadlineCounter deadline={contest_deadline} />
        {/* contest winner */}
        {difference <= 0 && winner_email && (
          <>
            <SectionTitle
              subHeading="--- Let's see ---"
              heading="contest winner"
            />
            <div className="">
              <img
                className="mx-auto rounded-full w-52"
                src={winner_photo}
                alt=""
              />
              <h2 className="text-center text-special text-2xl font-semibold font-slab mt-10 tracking-wide">
                {winner_name}
              </h2>
            </div>
          </>
        )}
        {/* contest details */}
        <SectionTitle
          subHeading="--- Register Now ---"
          heading="contest info"
        />
        <div className="container mx-auto animated-gradient text-sub-head text-base md:text-lg font-semibold px-3 md:px-12 py-12 lg:py-20 rounded-lg flex flex-col lg:flex-row lg:items-center gap-y-12">
          <figure className="max-w-prose ">
            <img
              className="w-full rounded-lg"
              src={contest_image}
              alt="food-image"
            />
          </figure>
          <div className="space-y-3 px-10 flex-1">
            <h2 className="text-blue-gray-500 font-bold text-3xl lg:text-4xl mb-8">
              Information
            </h2>
            <p>
              Name:{" "}
              <span className="text-head text-lg md:text-xl">
                {contest_name}
              </span>
            </p>
            <p>
              Description:{" "}
              <span className="text-head text-lg md:text-xl">
                {description}
              </span>
            </p>
            <p>
              Participation:{" "}
              <span className="text-head text-lg md:text-xl">
                {participation_count}
              </span>
            </p>
            <p>
              Prize:{" "}
              <span className="text-head text-lg md:text-xl">
                ${prize_money}
              </span>
            </p>
            <p>
              Price:{" "}
              <span className="text-special text-lg md:text-xl">
                ${contest_price}
              </span>
            </p>
            <button className="pt-8">
              <Link
                to={`/register-contest/${id}`}
                className="bg-head px-8 py-3.5 rounded-lg"
              >
                Register Now
              </Link>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContestDetails;

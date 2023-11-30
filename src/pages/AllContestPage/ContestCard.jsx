import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ContestCard = ({ contest }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
      {contest?.map(
        (item) =>
          item?.status === "accepted" && (
            <div
              key={item?._id}
              className="animated-gradient p-5 space-y-5 card-effect"
            >
              <figure className="border-4 border-special rounded-lg">
                <img
                  className="rounded-md w-full h-52 object-cover"
                  src={item?.contest_image}
                  alt="contest-image"
                />
              </figure>
              <div className="space-y-2 px-3 xl:text-lg font-medium">
                <p className="text-sub-head">
                  Contest Name:{" "}
                  <span className="text-special text-lg xl:text-xl">
                    {item?.contest_name}
                  </span>
                </p>
                <p className="text-sub-head">
                  Attempted:{" "}
                  <span className="text-special text-lg xl:text-xl">
                    {item?.participation_count}
                  </span>
                </p>
                <p className="text-sub-head">
                  Short Description:{" "}
                  <span className="text-special text-lg xl:text-xl">
                    {item?.description.slice(0, 25) + ". . ."}
                  </span>
                </p>
                <div className="flex justify-center pt-5 pb-2">
                  <Link
                    to={`/all-contest/${item?._id}`}
                    className="btn btn-outline xl:text-lg text-special font-semibold bg-[#e2e2e2] border-0 border-b-2"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

ContestCard.propTypes = {
  contest: PropTypes.array,
};

export default ContestCard;

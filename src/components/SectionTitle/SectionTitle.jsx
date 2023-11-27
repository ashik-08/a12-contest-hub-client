import PropTypes from "prop-types";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="w-3/4 md:w-2/5 lg:w-1/3 xl:w-1/4 mx-auto text-center italic pt-24 md:pt-28 lg:pt-32 xl:pt-36 mb-10 md:mb-14 lg:mb-16 xl:mb-20">
      <p className="text-special md:text-lg lg:text-xl mb-4">{subHeading}</p>
      <h1 className="text-head text-3xl md:text-4xl uppercase border-y-4 py-5">
        {heading}
      </h1>
    </div>
  );
};

SectionTitle.propTypes = {
  heading: PropTypes.node,
  subHeading: PropTypes.node,
};

export default SectionTitle;

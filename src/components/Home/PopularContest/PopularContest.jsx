import SectionTitle from "../../SectionTitle/SectionTitle";
import useContest from "../../hooks/useContest";
import ContestCard from "../../../pages/AllContestPage/ContestCard";

const PopularContest = () => {
  const [, popular] = useContest();

  return (
    <section>
      <SectionTitle
        subHeading="--- Don't miss ---"
        heading="popular contests"
      />
      <ContestCard contest={popular} />
    </section>
  );
};

export default PopularContest;

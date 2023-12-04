import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const MyRegisteredContest = () => {
  return (
    <>
      <Helmet>
        <title>Contest Hub | My Registered Contests</title>
      </Helmet>
      <section>
        <SectionTitle subHeading="--- Let's see ---" heading="registered contests" />
      </section>
    </>
  );
};

export default MyRegisteredContest;

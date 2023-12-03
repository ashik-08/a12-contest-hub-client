import { Helmet } from "react-helmet-async";
import Container from "../../components/Container/Container";
import PopularContest from "../../components/Home/PopularContest/PopularContest";
import Banner from "../../components/Home/Banner/Banner";
import BestCreator from "../../components/Home/BestCreator/BestCreator";

const HomePage = () => {
  return (
    <section>
      <Helmet>
        <title>Contest Hub | Home</title>
      </Helmet>
      <Container>
        <Banner />
        <PopularContest />
        <BestCreator />
      </Container>
    </section>
  );
};

export default HomePage;

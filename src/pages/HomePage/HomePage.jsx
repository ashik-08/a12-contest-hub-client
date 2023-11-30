import { Helmet } from "react-helmet-async";
import Container from "../../components/Container/Container";
import PopularContest from "../../components/Home/PopularContest/PopularContest";

const HomePage = () => {
  return (
    <section>
      <Helmet>
        <title>Contest Hub | Home</title>
      </Helmet>
      <Container>
        <PopularContest />
      </Container>
    </section>
  );
};

export default HomePage;

import Container from "../../components/Container/Container";

const Dashboard = () => {
  return (
    <Container>
      <div className="pt-24 md:pt-28 lg:pt-32 xl:pt-36">
        <img src="https://i.ibb.co/4TtdwKB/welcome.jpg" alt="" />
        <h1 className="text-center text-5xl text-special font-semibold uppercase italic">
          to the dashboard
        </h1>
      </div>
    </Container>
  );
};

export default Dashboard;

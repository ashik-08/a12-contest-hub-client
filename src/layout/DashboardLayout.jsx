import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Container from "../components/Container/Container";

const DashboardLayout = () => {
  return (
    <section>
      <NavBar />
      <div className="min-h-[calc(100vh-524px)]">
        <Container>
          <Outlet />
        </Container>
      </div>
      <Footer />
    </section>
  );
};

export default DashboardLayout;

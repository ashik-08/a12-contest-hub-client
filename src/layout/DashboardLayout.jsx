import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const DashboardLayout = () => {
  return (
    <section>
      <NavBar />
      <div className="min-h-[calc(100vh-524px)]">
        <Outlet />
      </div>
      <Footer />
    </section>
  );
};

export default DashboardLayout;

import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <section>
      <NavBar />
      <div className="min-h-[calc(100vh-475px)]">
        <Outlet />
      </div>
      <Footer />
    </section>
  );
};

export default MainLayout;

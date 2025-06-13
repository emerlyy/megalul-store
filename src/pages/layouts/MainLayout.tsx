import { Outlet } from "react-router";
import Footer from "../../ui/Footer/Footer";
import Header from "../../ui/Header/Header";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

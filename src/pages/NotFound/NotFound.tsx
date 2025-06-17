import Footer from "../../components/ui/Footer/Footer";
import Header from "../../components/ui/Header/Header";
import Title from "../../components/ui/Title/Title";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="content not-found">
        <Title size="xl">Page not found</Title>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

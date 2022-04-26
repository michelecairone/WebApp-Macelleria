import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <a name="contatti">
        <Footer />
      </a>
    </>
  );
};

export default Layout;

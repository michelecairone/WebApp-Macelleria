import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const user = false;
  return (
    <>
      <Navbar user={false} />
      {children}
      <a name="contatti">
        <Footer />
      </a>
    </>
  );
};

export default Layout;

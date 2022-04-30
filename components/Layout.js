import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, user }) => {
  
  return (
    <>
      <Navbar user={user} />
      {children}
      <a name="contatti">
        <Footer />
      </a>
    </>
  );
};

export default Layout;

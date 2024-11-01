// Deprecated on October 25 following the implementation of the new Nefentus design.
import Footer from "./../components/footer";
import Navigation from "./../components/navigation/navigation";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

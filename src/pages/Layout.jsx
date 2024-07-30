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

// Deprecated on October 25 following the implementation of the new Nefentus design.
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import "./layout.css";

const Layout2 = ({ children }) => {
  return (
    <div className="layout-container-wrapper">
      <div className="layout-container">
        <Header />
        {children}
        <div className="landing-layout">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout2;

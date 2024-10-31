import Footer from "./components/footer";
import "./style/general.css";
import Navigation from "./components/navigation/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { Route, Routes, useLocation, BrowserRouter } from "react-router-dom";
import CookieBanner from "./components/cookieBanner/cookieBanner";
import { getAcceptCookie } from "./func/cookies";
import { MessageContextProvider } from "./context/message";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Layout = React.lazy(() => import("./pages/Layout"));
const Privacy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsofUSe = React.lazy(() => import("./pages/TermsofUse"));
const AMLPolicy = React.lazy(() => import("./pages/AMLPolicy"));
const CookiePolicy = React.lazy(() => import("./pages/CookiePolicy"));
const Imprint = React.lazy(() => import("./pages/Imprint"));
const Vacancy = React.lazy(() => import("./pages/Vacancy"));
const Jobs = React.lazy(() => import("./pages/Jobs"));
import PageNotFound from "./components/pageNotFound";

import { AuthProvider } from "./context/auth/authContext";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import B2C from "./pages/B2C";
import B2B from "./pages/B2B";
import Resources from "./pages/Resources";
import BusinessSupport from "./pages/BusinessSupport";
import TechnicalSupport from "./pages/TechnicalSupport";
import Layout2 from "./layout";
import Pricing from "./pages/pricing";
import Business from "./pages/business";
import Private from "./pages/private";

function App() {
  useEffect(() => {
    const scrollEvent = () => {
      const scrollElement = document.querySelectorAll(".scroll");
      const slideElement = document.querySelectorAll(".slide-left");
      const slideElement2 = document.querySelectorAll(".slide-right");

      const addClass = (element, className) => {
        for (let i = 0; i < element.length; i++) {
          const sectionTop = element[i].offsetTop;

          const scrollPosition = window.scrollY;

          if (scrollPosition + window.innerHeight * 0.6 >= sectionTop) {
            element[i].classList.add(className);
          }
        }
      };

      addClass(scrollElement, "scrollAnimation");
      addClass(slideElement, "slideAnimation");
      addClass(slideElement2, "slideAnimation");
    };

    window.addEventListener("scroll", scrollEvent);

    document.addEventListener("contextmenu", (event) => {
      // event.preventDefault();
    });

    return () => {
      window.removeEventListener("scroll", () => scrollEvent);
    };
  }, []);

  const [ck, setCK] = useState(getAcceptCookie());

  return (
    <AuthProvider>
      <div className={`App`}>
        <MessageContextProvider>
          <ToastContainer />
          <BrowserRouter>
            <Suspense
              fallback={<div className="loadingAnimationWrapper"></div>}
            >
              <ScrollToTop>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Layout>
                        <Home />
                      </Layout>
                    }
                  />
                  <Route
                    path="/home2"
                    element={
                      <Layout2>
                        <Home2 />
                      </Layout2>
                    }
                  />
                  <Route
                    path="/pricing"
                    element={
                      <Layout2>
                        <Pricing />
                      </Layout2>
                    }
                  />
                  <Route
                    path="/business"
                    element={
                      <Layout2>
                        <Business />
                      </Layout2>
                    }
                  />
                  <Route
                    path="/private"
                    element={
                      <Layout2>
                        <Private />
                      </Layout2>
                    }
                  />
                  <Route
                    path="/b2c"
                    element={
                      <Layout>
                        <B2C />
                      </Layout>
                    }
                  />
                  <Route
                    path="/b2b"
                    element={
                      <Layout>
                        <B2B />
                      </Layout>
                    }
                  />
                  <Route path="/resources" element={<Resources />} />
                  <Route
                    path="/business-support"
                    element={
                      <Layout2>
                        <BusinessSupport />
                      </Layout2>
                    }
                  />
                  <Route
                    path="/technical-support"
                    element={
                      <Layout2>
                        <TechnicalSupport />
                      </Layout2>
                    }
                  />
                  <Route
                    path="/terms-of-use"
                    element={
                      <>
                        <Layout2>
                          <TermsofUSe />
                        </Layout2>
                      </>
                    }
                  />
                  <Route
                    path="/aml-policy"
                    element={
                      <>
                        <Layout2>
                          <AMLPolicy />
                        </Layout2>
                      </>
                    }
                  />
                  <Route
                    path="/cookie-policy"
                    element={
                      <>
                        <Layout2>
                          <CookiePolicy />
                        </Layout2>
                      </>
                    }
                  />
                  <Route
                    path="/privacy-policy"
                    element={
                      <>
                        <Layout2>
                          <Privacy />
                        </Layout2>
                      </>
                    }
                  />
                  <Route
                    path="/imprint"
                    element={
                      <>
                        <Navigation />
                        <Imprint />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/vacancy"
                    element={
                      <>
                        <Layout2>
                          <Vacancy />
                        </Layout2>
                      </>
                    }
                  />
                  <Route
                    path="/jobs"
                    element={
                      <>
                        <Layout>
                          <Jobs />
                        </Layout>
                      </>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <>
                        <Navigation />
                        <PageNotFound />
                      </>
                    }
                  />
                </Routes>
              </ScrollToTop>
            </Suspense>

            {/* COOKIE BANNER */}
            {!ck && <CookieBanner close={() => setCK(true)} />}
          </BrowserRouter>
        </MessageContextProvider>
      </div>
    </AuthProvider>
  );
}

export default App;

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

import "./footer.css";
import { NefentusLogo } from "../../assets/icon/logos/logos";
import InNormal from "../../assets/resources/in.svg";
import InHover from "../../assets/resources/in_hover.svg";
import TelegramNormal from "../../assets/resources/telegram.svg";
import TelegramHover from "../../assets/resources/telegram_hover.svg";
import XNormal from "../../assets/resources/x.svg";
import XHover from "../../assets/resources/x_hover.svg";
import { useState } from "react";

const socials = {
  x: {
    iconNormal: XNormal,
    iconHover: XHover,
    link: "https://x.com/nefentusapp",
  },
  in: {
    iconNormal: InNormal,
    iconHover: InHover,
    link: "https://cy.linkedin.com/company/nefentuspay",
  },
  telegram: {
    iconNormal: TelegramNormal,
    iconHover: TelegramHover,
    link: "https://t.me/nefentus",
  },
};
const sitemap = [
  {
    title: "Solutions",
    body: [
      {
        subtitle: "Personal use",
        link: "/private",
      },
      {
        subtitle: "Business use",
        link: "/business",
      },
    ],
  },
  {
    title: "Company",
    body: [
      {
        subtitle: "Career",
        link: "/vacancy",
      },
      {
        subtitle: "Log in",
        link: process.env.VITE_REACT_APP_DASHBOARD + "/login",
      },
    ],
  },
  {
    title: "Support",
    body: [
      {
        subtitle: "FAQ",
        link: "/technical-support",
      },
      {
        subtitle: "Ask a question",
        link: "/business-support",
      },
    ],
  },
];
const sitemap_bottom = [
  {
    title: "Terms of use",
    link: "/terms-of-use",
  },
  {
    title: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    title: "AML Policy",
    link: "/aml-policy",
  },
  {
    title: "Cookie Policy",
    link: "/cookie-policy",
  },
];
const Footer = () => {
  const [icon_in, setIcon_in] = useState(socials.in.iconNormal);
  const [icon_tele, setIcon_tele] = useState(socials.telegram.iconNormal);
  const [icon_x, setIcon_x] = useState(socials.x.iconNormal);
  return (
    <div className="footer-layout">
      <div className="footer-top container">
        <div style={{ width: "12rem" }}>
          <NefentusLogo />
          <div className="socials">
            <a
              href={socials.x.link}
              onMouseEnter={() => setIcon_x(socials.x.iconHover)}
              onMouseLeave={() => setIcon_x(socials.x.iconNormal)}
            >
              <img src={icon_x} alt="icon" />
            </a>
            <a
              href={socials.in.link}
              onMouseEnter={() => setIcon_in(socials.in.iconHover)}
              onMouseLeave={() => setIcon_in(socials.in.iconNormal)}
            >
              <img src={icon_in} alt="icon" />
            </a>
            <a
              href={socials.telegram.link}
              onMouseEnter={() => setIcon_tele(socials.telegram.iconHover)}
              onMouseLeave={() => setIcon_tele(socials.telegram.iconNormal)}
            >
              <img src={icon_tele} alt="icon" />
            </a>
          </div>
        </div>
        <div className="sitemap">
          {sitemap.map((item) => (
            <div className="sitemap-item">
              <div className="anchor-item-title">{item.title}</div>
              {item.body.map((list) => (
                <a href={list.link}>{list.subtitle}</a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Data and information on this website are provided for informational
          purposes only, and are not intended for reference or other purposes.
          All financial, statistical and other relevant data regarding the
          clients/merchants, conducted transactions, etc., has been provided as
          aggregate from activities of all legal entities operating under the
          brand name of Nefentus, including, but not limited to: (I) Nefentus
          Soutions LTD, Faneromenis Avenue 85, Office 301, Larnaca, Cyprus.
          <br />
          The information on this site is not directed at residents of the
          United States or any particular country or jurisdiction where such
          distribution or use would be contrary to local law or regulation.
          Please examine the terms and conditions of our service and consult an
          expert if necessary.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>© 2024 Nefentus. All rights reserved.</p>
          <div className="bottom-right">
            {sitemap_bottom.map((item) => (
              <a href={item.link}>{item.title}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

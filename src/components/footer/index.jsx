import "./footer.css";
import { NefentusLogo } from "../../assets/icon/logos/logos";
import InNormal from "../../assets/resources/in.svg";
import InHover from "../../assets/resources/in_hover.svg";
import TelegramNormal from "../../assets/resources/telegram.svg";
import TelegramHover from "../../assets/resources/telegram_hover.svg";
import { useState } from "react";

const socials = {
  in: {
    iconNormal: InNormal,
    iconHover: InHover,
    link: "",
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
        link: "/personal-dashboard",
      },
      {
        subtitle: "Business use",
        link: "/sales-dashboard",
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
        link: "/login",
      },
    ],
  },
  {
    title: "Support",
    body: [
      {
        subtitle: "FAQ",
        link: "/resources",
      },
      {
        subtitle: "Ask a question",
        link: "#",
      },
    ],
  },
];
const sitemap_bottom = [
  {
    title: "Terms",
    link: "/imprint",
  },
  {
    title: "Privacy",
    link: "/privacy",
  },
];
const Footer = () => {
  const [icon_in, setIcon_in] = useState(socials.in.iconNormal);
  const [icon_tele, setIcon_tele] = useState(socials.telegram.iconNormal);
  return (
    <div className="footer-layout">
      <div className="footer-top container">
        <div style={{ width: "12rem" }}>
          <NefentusLogo />
          <div className="socials">
            <a
              href={socials.in.link}
              onMouseEnter={() => setIcon_in(socials.in.iconHover)}
              onMouseLeave={() => setIcon_in(socials.in.iconNormal)}
            >
              <img src={icon_in} />
            </a>
            <a
              href={socials.telegram.link}
              onMouseEnter={() => setIcon_tele(socials.telegram.iconHover)}
              onMouseLeave={() => setIcon_tele(socials.telegram.iconNormal)}
            >
              <img src={icon_tele} />
            </a>
          </div>
        </div>
        <div className="sitemap">
          {sitemap.map((item) => (
            <div className="sitemap-item">
              <a>{item.title}</a>
              {item.body.map((list) => (
                <a href={list.link}>{list.subtitle}</a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© 2024 Nefentus. All rights reserved.</p>
        <div className="bottom-right">
          {sitemap_bottom.map((item) => (
            <a href={item.link}>{item.title}</a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

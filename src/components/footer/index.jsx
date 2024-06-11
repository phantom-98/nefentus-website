import "./footer.css";
import { NefentusLogo } from "../../assets/icon/logos/logos";
import X from "../../assets/resources/x.svg";
import In from "../../assets/resources/in.svg";
import Github from "../../assets/resources/github.svg";
import Telegram from "../../assets/resources/telegram.svg";

const socials = [
  {
    icon: X,
    link: "",
  },
  {
    icon: In,
    link: "",
  },
  {
    icon: Github,
    link: "https://github.com/nefentus",
  },
  {
    icon: Telegram,
    link: "https://t.me/nefentus",
  },
];
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
  return (
    <div className="footer-layout">
      <div className="footer-top container">
        <div style={{ width: "12rem" }}>
          <NefentusLogo />
          <div className="socials">
            {socials.map((item) => (
              <a href={item.link}>
                <img src={item.icon} />
              </a>
            ))}
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

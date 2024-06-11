import { Link } from "react-router-dom";
import "./resources.css";
import LineLeft from "../../assets/resources/line-left.svg";
import LineRight from "../../assets/resources/line-right.svg";
import Dashboard from "../../assets/resources/dashboard.png";
import X from "../../assets/resources/x.svg";
import In from "../../assets/resources/in.svg";
import Github from "../../assets/resources/github.svg";
import Telegram from "../../assets/resources/telegram.svg";

const sidebar = [
  {
    title: "Getting started",
    subtitle: [
      {
        name: "What is Nefentus?",
        link: "#what-is-nefentus",
      },
      {
        name: "How does Nefentus work?",
        link: "#how-does-nefentus-work",
      },
      {
        name: "Is Nefentus secure?",
        link: "#is-nefentus-secure",
      },
      {
        name: "What cryptocurrencies does Nefentus support?",
        link: "#supported-cryptocurrencies",
      },
    ],
  },
  {
    title: "Integration and Setup",
    subtitle: [
      {
        name: "How do I integrate Nefentus with my business?",
        link: "#what-is-nefentus",
      },
      {
        name: "Do I need any special hardware or software to use Nefentus?",
        link: "#how-does-nefentus-work",
      },
      {
        name: "How long does it take to set up Nefentus?",
        link: "#is-nefentus-secure",
      },
      {
        name: "What cryptocurrencies does Nefentus support?",
        link: "#supported-cryptocurrencies",
      },
    ],
  },
  {
    title: "Payments and Transactions",
    subtitle: [
      {
        name: "How are crypto payments processed?",
        link: "#what-is-nefentus",
      },
      {
        name: "Can customers pay with any cryptocurrency?",
        link: "#how-does-nefentus-work",
      },
      {
        name: "How long do transactions take to complete?",
        link: "#is-nefentus-secure",
      },
      {
        name: "Are there any fees associated with using Nefentus?",
        link: "#supported-cryptocurrencies",
      },
    ],
  },
];
const contents = [
  <h1 id="what-is-nefentus">What is Nefentus?</h1>,
  <p>
    Nefentus is a comprehensive solution that allows businesses to integrate
    cryptocurrency payments into their existing systems seamlessly. We support a
    wide range of popular cryptocurrencies including Bitcoin (BTC), Ethereum
    (ETH), Litecoin (LTC), and many others. For a full list, please refer to our
    supported currencies page. Yes, security is our top priority. We use
    advanced encryption techniques and comply with industry best practices to
    ensure that all transactions and data are secure.{" "}
  </p>,
  <h2>What is Nefentus?</h2>,
  <p>
    Integration is straightforward. You can use our API documentation to
    integrate crypto payments into your website, mobile app, or point-of-sale
    system. Additionally, we offer plugins for popular e-commerce platforms.
  </p>,
  <p>
    Nefentus is a comprehensive solution that allows businesses to integrate
    cryptocurrency payments into their existing systems seamlessly. We support a
    wide range of popular cryptocurrencies including Bitcoin (BTC), Ethereum
    (ETH), Litecoin (LTC), and many others. For a full list, please refer to our
    supported currencies page. Yes, security is our top priority. We use
    advanced encryption techniques and comply with industry best practices to
    ensure that all transactions and data are secure.{" "}
  </p>,
  <p>
    Ready to start? <a>Begin the tutorial</a>
  </p>,
  <hr />,
  <h1>What is Nefentus?</h1>,
  <img src={Dashboard} />,
  <p>
    Nefentus is a comprehensive solution that allows businesses to integrate
    cryptocurrency payments into their existing systems seamlessly. We support a
    wide range of popular cryptocurrencies including Bitcoin (BTC), Ethereum
    (ETH), Litecoin (LTC), and many others. For a full list, please refer to our
    supported currencies page. Yes, security is our top priority. We use
    advanced encryption techniques and comply with industry best practices to
    ensure that all transactions and data are secure.{" "}
  </p>,
];
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
const Resources = () => {
  return (
    <div className="resources-layout container">
      <hr
        style={{
          position: "absolute",
          top: "0",
          left: "-32rem",
          width: "200vw",
          border: "1px solid #202020",
        }}
      />
      <div className="sidebar">
        {sidebar.map((item) => {
          return (
            <div className="sidebar-item">
              <p>{item.title}</p>
              <div className="sidebar-item-body">
                {item.subtitle.map((subitem) => {
                  return (
                    <div className="sidebar-subitem">
                      <Link to={subitem.link}>{subitem.name}</Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="contents">
        <img
          src={LineLeft}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            padding: "0",
            width: "64%",
          }}
        />
        <img
          src={LineRight}
          style={{
            position: "absolute",
            top: "0",
            right: "-16rem",
            padding: "0",
            width: "64%",
          }}
        />
        {contents.map((item) => item)}
        <div className="footer">
          <p>© 2024 Nefentus. All rights reserved.</p>
          <div className="socials">
            {socials.map((item) => (
              <a href={item.link}>
                <img src={item.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;

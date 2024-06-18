import "./resources.css";
import LineLeft from "../../assets/resources/line-left.svg";
import LineRight from "../../assets/resources/line-right.svg";
import X from "../../assets/resources/x.svg";
import In from "../../assets/resources/in.svg";
import Github from "../../assets/resources/github.svg";
import Telegram from "../../assets/resources/telegram.svg";
import { useState } from "react";

const sidebar = [
  {
    title: "Frequently Asked Questions about Nefentus",
    subtitle: [
      {
        name: "What is Nefentus?",
        link: "#what-is-nefentus",
      },
      {
        name: "How does Nefentus work?",
        link: "#how-it-works",
      },
      {
        name: "Is Nefentus secure?",
        link: "#is-it-secure",
      },
      {
        name: "What cryptocurrencies does Nefentus support?",
        link: "#supported-currency",
      },
      {
        name: "How do I integrate Nefentus with my business?",
        link: "#how-to-integrate",
      },
      {
        name: "Do I need any special hardware or software to use Nefentus?",
        link: "#special-needs",
      },
      {
        name: "How long does it take to set up Nefentus?",
        link: "#how-long-to-setup",
      },
      {
        name: "What cryptocurrencies does Nefentus support?",
        link: "#currenies",
      },
      {
        name: "Can customers pay with any cryptocurrency?",
        link: "#pay-any-token",
      },
      {
        name: "How long do transactions take to complete?",
        link: "#transaction-completion-time",
      },
      {
        name: "Are there any fees associated with using Nefentus?",
        link: "#fees",
      },
    ],
  },
];
const contents = [
  <h1>Frequently Asked Questions about Nefentus</h1>,
  <h2 id="what-is-nefentus">What is Nefentus?</h2>,
  <p>
    Nefentus is a cutting-edge platform designed to facilitate secure and
    efficient cryptocurrency transactions for businesses. It allows merchants to
    accept multiple cryptocurrencies as payment, providing a seamless and
    user-friendly experience for both sellers and buyers.
  </p>,
  <h2 id="how-it-works">How does Nefentus work?</h2>,
  <p>
    Nefentus works by integrating with your business to provide a streamlined
    process for accepting cryptocurrency payments. When a customer makes a
    purchase, they can choose from supported cryptocurrencies to complete the
    transaction. Nefentus processes the payment, converts it to stablecoins if
    desired, and ensures the funds are securely transferred to the merchant's
    account.
  </p>,
  <h2 id="is-it-secure">Is Nefentus secure?</h2>,
  <p>
    Yes, Nefentus is highly secure. It uses advanced encryption protocols,
    blockchain technology, and a non-custodial model to ensure the safety and
    integrity of your transactions and funds. Additionally, features like
    two-factor authentication and real-time monitoring further enhance security.
  </p>,
  <h2 id="supported-currency">What cryptocurrencies does Nefentus support?</h2>,
  <p>
    Nefentus supports a wide range of popular cryptocurrencies, including
    Bitcoin (BTC), Ethereum (ETH), and Tether (USDT). The platform is
    continuously expanding its list of supported cryptocurrencies to meet market
    demands.
  </p>,
  <h2 id="how-to-integrate">How do I integrate Nefentus with my business?</h2>,
  <p>
    Integrating Nefentus with your business is straightforward. You can use our
    API or plugins to connect your online store or payment system to Nefentus.
    Detailed documentation and support are provided to guide you through the
    integration process.
  </p>,
  <h2 id="special-needs">
    Do I need any special hardware or software to use Nefentus?
  </h2>,
  <p>
    No special hardware is required to use Nefentus. You only need access to an
    internet-enabled device to manage your account and transactions. Our
    platform is web-based and compatible with most major e-commerce platforms
    and payment systems.
  </p>,
  <h2 id="how-long-to-setup">How long does it take to set up Nefentus?</h2>,
  <p>
    Setting up Nefentus is quick and easy. The initial registration and basic
    setup can be completed in a few minutes. Full integration with your business
    systems may take a few hours, depending on your specific requirements and
    the complexity of your setup.
  </p>,
  <h2 id="currenies">What cryptocurrencies does Nefentus support?</h2>,
  <p>
    Nefentus supports a variety of cryptocurrencies, including but not limited
    to Bitcoin (BTC), Ethereum (ETH), and Tether (USDT). We continually add new
    cryptocurrencies to our platform to provide more options for our users.
  </p>,
  <h2 id="pay-any-token">Can customers pay with any cryptocurrency?</h2>,
  <p>
    Customers can pay with any of the cryptocurrencies supported by Nefentus.
    The list of supported cryptocurrencies is regularly updated to include the
    most popular and widely used digital currencies.
  </p>,
  <h2 id="transaction-completion-time">
    How long do transactions take to complete?
  </h2>,
  <p>
    Transaction times vary depending on the specific cryptocurrency used and the
    network's current load. Generally, transactions are processed within a few
    minutes. Nefentus ensures that all transactions are completed as quickly and
    efficiently as possible.
  </p>,
  <h2 id="fees">Are there any fees associated with using Nefentus?</h2>,
  <p>
    Yes, there are nominal fees associated with using Nefentus. These fees cover
    transaction processing and platform maintenance. The exact fee structure is
    transparent and detailed in our pricing policy, which is available on our
    website.
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
  const [hash, setHash] = useState(window.location.hash);
  const select = (h) => {
    window.location.hash = h;
    setHash(h);
  };
  const [open, setOpen] = useState(false);
  const [blur, setBlur] = useState(false);
  const openSidebar = () => {
    setBlur(true);
    setOpen(true);
  };
  const closeSidebar = () => {
    setOpen(false);
    setTimeout(() => setBlur(false), 300);
  };
  return (
    <div className="resources-layout container">
      <div
        className="toggle-button container"
        onClick={() => {
          if (open) {
            closeSidebar();
          } else {
            openSidebar();
          }
        }}
      >
        {open ? `< Close` : `> Open`}
      </div>
      <div className="horizontal">
        <hr
          style={{
            position: "absolute",
            top: "0",
            width: "100vw",
            border: "1px solid #202020",
          }}
        />
        <div
          onClick={() => closeSidebar()}
          className="back-blur"
          style={{ display: blur && "block" }}
        ></div>
        <div className={`sidebar ${open && "open-sidebar"}`}>
          {sidebar.map((item) => {
            return (
              <div className="sidebar-item">
                <p>{item.title}</p>
                <div className="sidebar-item-body">
                  {item.subtitle.map((subitem) => {
                    return (
                      <div
                        onClick={() => {
                          select(subitem.link);
                          closeSidebar();
                        }}
                        className={`sidebar-subitem ${
                          hash == subitem.link && "sidebar-subitem-selected"
                        }`}
                      >
                        {subitem.name}
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
    </div>
  );
};

export default Resources;

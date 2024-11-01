// Deprecated on October 25 following the implementation of the new Nefentus design.
import "./resources.css";
import LineLeft from "../../assets/resources/line-left.svg";
import LineRight from "../../assets/resources/line-right.svg";
import InNormal from "../../assets/resources/in.svg";
import InHover from "../../assets/resources/in_hover.svg";
import TelegramNormal from "../../assets/resources/telegram.svg";
import TelegramHover from "../../assets/resources/telegram_hover.svg";
import XNormal from "../../assets/resources/x.svg";
import XHover from "../../assets/resources/x_hover.svg";
import IntroductionVideo from "../../assets/video/introduction.mp4";
import { useEffect, useState } from "react";

const sidebar = [
  {
    id: "support-center",
    title: "Support Center Questions",
    subtitle: [
      {
        name: "Welcome the the support page from Nefentus Solutions!",
        link: "#welcome-nefentus",
      },
      {
        name: "For more help, contact us!",
        link: "#contact-us",
      },
    ],
  },
  {
    id: "faq",
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
const contents = {
  "support-center": [
    <h1>Support Center Questions:</h1>,
    <h2 id="welcome-nefentus">
      Welcome to the support page from Nefentus Solutions!
    </h2>,
    <p>
      You can find all the information regarding Nefentus Solutions in this
      area. You can find detailed information on what you can do, links to
      frequently asked questions and popular blog posts, as well as a getting
      started guide that leads you through using the product step-by-step.
    </p>,
    <video controls>
      <source src={IntroductionVideo} type="video/mp4" />
    </video>,
    <p
      style={{
        padding: "1.6rem 1rem",
        marginBottom: "1rem",
        width: "100%",
        background:
          "linear-gradient(90deg, rgba(21, 149, 194, 0.1) 0%, rgba(102, 191, 222, 0.1) 100%)",
        borderRadius: "0 1rem 1rem 0",
        borderLeft: "2px solid #1595c2",
      }}
    >
      We've structured the documentation page into four groups:
    </p>,
    <p>1. Essential information about the product</p>,
    <p>2. Popular articles about product features</p>,
    <p>3. Additional resources you might find interesting</p>,
    <p>4. Ways to get in contact with us</p>,
    <h2 id="contact-us">For more help, contact us!</h2>,
    <p>
      If you prefer a more personal touch, we're always here to help via phone
      or email. Whether you have a quick question or need more in-depth
      assistance, we're just a call or click away.
    </p>,
    <div>
      <div
        style={{
          borderRadius: "1rem",
          border: "1px solid #202020",
          background: "#171717",
          padding: "1.6rem 4rem 0.6rem 2rem",
          cursor: "pointer",
          boxShadow: "5px 5px 20px #070707",
        }}
      >
        <h3 style={{ color: "#e9e9e9", fontSize: "1.4rem" }}>
          Message us via chat
        </h3>
        <p style={{ fontSize: "1.1rem" }}>
          Write us uncomplicated and fast via chat.
        </p>
      </div>
      <div
        style={{
          borderRadius: "1rem",
          border: "1px solid #202020",
          background: "#171717",
          padding: "1.6rem 4rem 0.6rem 2rem",
          cursor: "pointer",
          boxShadow: "5px 5px 20px #070707",
        }}
      >
        <h3 style={{ color: "#e9e9e9", fontSize: "1.4rem" }}>
          support@nefentus.com
        </h3>
        <p style={{ fontSize: "1.1rem" }}>
          Your request will be answered within one day.
        </p>
      </div>
    </div>,
  ],
  faq: [
    <h1>Frequently Asked Questions about Nefentus</h1>,
    <h2 id="what-is-nefentus">What is Nefentus?</h2>,
    <p>
      Nefentus is a cutting-edge platform designed to facilitate secure and
      efficient cryptocurrency transactions for businesses. It allows merchants
      to accept multiple cryptocurrencies as payment, providing a seamless and
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
      two-factor authentication and real-time monitoring further enhance
      security.
    </p>,
    <h2 id="supported-currency">
      What cryptocurrencies does Nefentus support?
    </h2>,
    <p>
      Nefentus supports a wide range of popular cryptocurrencies, including
      Bitcoin (BTC), Ethereum (ETH), and Tether (USDT). The platform is
      continuously expanding its list of supported cryptocurrencies to meet
      market demands.
    </p>,
    <h2 id="how-to-integrate">
      How do I integrate Nefentus with my business?
    </h2>,
    <p>
      Integrating Nefentus with your business is straightforward. You can use
      our API or plugins to connect your online store or payment system to
      Nefentus. Detailed documentation and support are provided to guide you
      through the integration process.
    </p>,
    <h2 id="special-needs">
      Do I need any special hardware or software to use Nefentus?
    </h2>,
    <p>
      No special hardware is required to use Nefentus. You only need access to
      an internet-enabled device to manage your account and transactions. Our
      platform is web-based and compatible with most major e-commerce platforms
      and payment systems.
    </p>,
    <h2 id="how-long-to-setup">How long does it take to set up Nefentus?</h2>,
    <p>
      Setting up Nefentus is quick and easy. The initial registration and basic
      setup can be completed in a few minutes. Full integration with your
      business systems may take a few hours, depending on your specific
      requirements and the complexity of your setup.
    </p>,
    <h2 id="currenies">What cryptocurrencies does Nefentus support?</h2>,
    <p>
      Nefentus supports a variety of cryptocurrencies, including but not limited
      to Bitcoin (BTC), Ethereum (ETH), and Tether (USDT). We continually add
      new cryptocurrencies to our platform to provide more options for our
      users.
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
      Transaction times vary depending on the specific cryptocurrency used and
      the network's current load. Generally, transactions are processed within a
      few minutes. Nefentus ensures that all transactions are completed as
      quickly and efficiently as possible.
    </p>,
    <h2 id="fees">Are there any fees associated with using Nefentus?</h2>,
    <p>
      Yes, there are nominal fees associated with using Nefentus. These fees
      cover transaction processing and platform maintenance. The exact fee
      structure is transparent and detailed in our pricing policy, which is
      available on our website.
    </p>,
  ],
};
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
const ResourcesBody = () => {
  const [icon_in, setIcon_in] = useState(socials.in.iconNormal);
  const [icon_tele, setIcon_tele] = useState(socials.telegram.iconNormal);
  const [icon_x, setIcon_x] = useState(socials.x.iconNormal);
  const [hash, setHash] = useState(window.location.hash);
  const [blockId, setBlockId] = useState(sidebar[0].id);
  const select = (h) => {
    window.location.hash = h;
    setHash(h);
  };
  useEffect(() => {
    const block = sidebar.find((item) => {
      return item.subtitle.find((title) => title.link === hash);
    });
    block && setBlockId(block.id);
  }, []);
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
                          if (blockId !== item.id) {
                            setBlockId(item.id);
                            setTimeout(() => select(subitem.link), 200);
                          } else {
                            select(subitem.link);
                          }

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
            alt="icon"
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
            alt="icon"
          />
          {contents[blockId].map((item) => item)}
          <div className="footer">
            <p>© 2024 Nefentus. All rights reserved.</p>
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
        </div>
      </div>
    </div>
  );
};

export default ResourcesBody;

import { useContext, useState } from "react";
import "./landing.css";
import { useTranslation } from "react-i18next";
import Input, { CountrySelect, Textarea } from "../input/input";
import { getCountryList } from "../../countries";
import Button from "../button/button";
import LeftSvg from "../../assets/landing/contact-left.svg";
import TopSvg from "../../assets/landing/contact-top.svg";
import BottomSvg from "../../assets/landing/contact-bottom.svg";
import backendAPI from "../../api/backendAPI";
import { MessageContext } from "../../context/message";

const ContactUs_Expert = () => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [spinner, setSpinner] = useState(false);
  const { setInfoMessage, setErrorMessage } = useContext(MessageContext);
  const emailTo = "contacttoexpert@nefentus.com";
  const contactTo = "expert";

  const contact = async () => {
    if (!fullName) {
      setErrorMessage("Please input your full name!");
      return;
    }
    if (!email) {
      setErrorMessage("Please input your email!");
      return;
    }
    if (!description) {
      setErrorMessage("Please input the description!");
      return;
    }
    setSpinner(true);
    const res = await new backendAPI().contact({
      contactTo,
      emailTo,
      fullName,
      email,
      description,
    });
    if (res) {
      setInfoMessage("We got your email successfully!");
      setFullName("");
      setEmail("");
      setDescription("");
    } else {
      setErrorMessage("Unknown error!");
    }
    setSpinner(false);
  };

  return (
    <div className="landing-layout contact">
      <div className="contact-layout">
        <h1>
          Write to our <span style={{ textWrap: "nowrap" }}>support team</span>
        </h1>
        <p>
          We're here to help! Whether you have questions about our platform,
          need assistance with integration, or want to provide feedback, our
          team is ready to assist you.
        </p>
        <div className="contact-form">
          <Input
            label={t("contact.name")}
            value={fullName}
            setState={setFullName}
            placeholder={`e.g. John Doe`}
          />
          <Input
            label={t("contact.email")}
            value={email}
            setState={setEmail}
            placeholder={`e.g. yourmail@mail.com`}
          />
          <Textarea
            label={t("contact.commentExpert")}
            placeholder={`Description...`}
            value={description}
            setState={setDescription}
          />
          <Button
            children={t("contact.submit")}
            style={{
              padding: "0rem 2rem",
              background: "none",
              boxShadow: "none",
              width: "100%",
            }}
            spinner={spinner}
            onClick={contact}
          />
        </div>
        <h2>
          Thank you for reaching out to us.
          <br />
          We look forward to assisting you!
        </h2>
      </div>
      <hr
        style={{
          top: "0",
          zIndex: "1",
          width: "100vw",
        }}
      />
      <img
        src={LeftSvg}
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          zIndex: "-1",
        }}
      />
      <img
        src={TopSvg}
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          zIndex: "-1",
        }}
      />
      <img
        src={BottomSvg}
        style={{
          position: "absolute",
          right: "0",
          bottom: "0",
          zIndex: "-1",
        }}
      />
    </div>
  );
};

export default ContactUs_Expert;

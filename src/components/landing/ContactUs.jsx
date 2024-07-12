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

const ContactUs = () => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [spinner, setSpinner] = useState(false);
  const { setInfoMessage, setErrorMessage } = useContext(MessageContext);
  const emailTo = "sales@nefentus.com";

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
      emailTo,
      fullName,
      email,
      phone,
      company,
      country,
      description,
    });
    if (res) {
      setInfoMessage("Message sent successfully");
      setFullName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setCountry("");
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
          Contact Us for{" "}
          <span style={{ textWrap: "nowrap" }}>Business-Related Queries</span>
        </h1>
        <p>
          If you're looking to discuss business opportunities, need help with
          specific issues, or wish to share your feedback about our platform,
          our business support team is eager to assist you.
        </p>
        <div className="contact-form">
          <Input
            label={t("contact.name").concat("*")}
            value={fullName}
            setState={setFullName}
            placeholder={`e.g. John Doe`}
          />
          <Input
            label={t("contact.email").concat("*")}
            value={email}
            setState={setEmail}
            placeholder={`e.g. yourmail@mail.com`}
          />
          <Input
            label={t("contact.phone")}
            value={phone}
            setState={setPhone}
            placeholder={`e.g. +38 066 111 59 21`}
          />
          <Input
            label={t("contact.company")}
            value={company}
            setState={setCompany}
            placeholder={`e.g. Google`}
          />
          <CountrySelect
            label={t("contact.country")}
            placeholder={`e.g. Germany`}
            value={country}
            setValue={setCountry}
            options={getCountryList()}
            style={{
              background: "#171717",
              fontSize: "1.2rem",
            }}
          />
          <Textarea
            label={t("contact.comment").concat("*")}
            placeholder={`Tell us about your needs`}
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

export default ContactUs;

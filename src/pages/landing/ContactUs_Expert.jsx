import { useContext, useState } from "react";
import "./landing.css";
import { useTranslation } from "react-i18next";
import Input, { CountrySelect, Textarea } from "../../components/input/input";
import { getCountryList } from "../../countries";
import Button from "../../components/button/button";
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
  const emailTo = "dev@nefentus.com";

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
      description,
    });
    if (res) {
      setInfoMessage("Message sent successfully");
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
          Reach Out to Our{" "}
          <span style={{ textWrap: "nowrap" }}>Technical Support</span>
        </h1>
        <p>
          For inquiries related to technical issues, bug reports, or usage
          support for our platform, our dedicated technical support team is
          ready to provide you with the assistance you need.
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
          <Textarea
            label={t("contact.commentExpert").concat("*")}
            placeholder={`Description...`}
            value={description}
            setState={setDescription}
          />
          <button onClick={contact}>Submit</button>
          {/* <Button
            children={t("contact.submit")}
            style={{
              padding: "0rem 2rem",
              background: "none",
              boxShadow: "none",
              width: "100%",
            }}
            spinner={spinner}
            onClick={contact}
          /> */}
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

import { useContext, useState } from "react";
import "./landing.css";
import Input, { CountrySelect, Textarea } from "../../components/input/input";
import { getCountryList } from "../../countries";
import LeftSvg from "../../assets/landing/contact-left.svg";
import TopSvg from "../../assets/landing/contact-top.svg";
import BottomSvg from "../../assets/landing/contact-bottom.svg";
import backendAPI from "../../api/backendAPI";
import { MessageContext } from "../../context/message";
import CommonButton from "../commonButton";

const BusinessSupportBody = () => {
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
          <span style={{ textWrap: "nowrap" }}>Business-Related</span> Queries
        </h1>
        <p>
          If you're looking to discuss business opportunities, need help with
          specific issues, or wish to share your feedback about our platform,
          our business support team is eager to assist you.
        </p>
        <div className="contact-form">
          <Input
            label={"Full name*"}
            value={fullName}
            setState={setFullName}
            placeholder={`e.g. John Doe`}
          />
          <Input
            label={"Email*"}
            value={email}
            setState={setEmail}
            placeholder={`e.g. yourmail@mail.com`}
          />
          <Input
            label={"Phone"}
            value={phone}
            setState={setPhone}
            placeholder={`e.g. +38 066 111 59 21`}
          />
          <Input
            label={"Company"}
            value={company}
            setState={setCompany}
            placeholder={`e.g. Google`}
          />
          <CountrySelect
            label={"Country"}
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
            label={"Project/Business description*"}
            placeholder={`Tell us about your needs`}
            value={description}
            setState={setDescription}
          />
          <CommonButton text={"Submit"} type={"primary"} onClick={contact} />
        </div>
        <h2>
          Thank you for reaching out to us.
          <br />
          We look forward to assisting you!
        </h2>
      </div>
    </div>
  );
};

export default BusinessSupportBody;

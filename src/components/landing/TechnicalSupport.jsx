import { useContext, useState } from "react";
import "./landing.css";
import Input, { Textarea } from "../../components/input/input";
import LeftSvg from "../../assets/landing/contact-left.svg";
import TopSvg from "../../assets/landing/contact-top.svg";
import BottomSvg from "../../assets/landing/contact-bottom.svg";
import backendAPI from "../../api/backendAPI";
import { MessageContext } from "../../context/message";

const TechnicalSupportBody = () => {
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
          <Textarea
            label={"Describe your problem/question*"}
            placeholder={`Description...`}
            value={description}
            setState={setDescription}
          />
          <button onClick={contact}>Submit</button>
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

export default TechnicalSupportBody;

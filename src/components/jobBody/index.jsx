import { useTranslation } from "react-i18next";
import styles from "./jobBody.module.css";
import Input, { Textarea } from "../input/input";
import { useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Button from "../button/button";
import backendAPI from "../../api/backendAPI";
import { MessageContext } from "../../context/message";
import { validateEmail } from "../../utils";

const jobs = {
  sales_manager: {
    title: "Sales MANAGER DACH",
    items: ["Position", "Vertriebsmitarbeiter für Akquise im B2B Bereich"],
    description: `Über Nefentus: 
        Nefentus ist ein führender Anbieter innovativer Online-Zahlungslösungen, der sich darauf konzentriert, Transaktionen zu vereinfachen und das gesamte Zahlungserlebnis für Unternehmen und Verbraucher gleichermaßen zu verbessern. Mit modernster Technologie und einem kundenorientierten Ansatz steht Nefentus an vorderster Front der Revolutionierung der digitalen Zahlungslandschaft. 
        Stellenbeschreibung: 
        Position: Vertriebsmitarbeiter für Akquise im B2B Bereich (m/w/d) 
        Aufgabenbereich: 
        Wir suchen einen dynamischen und ergebnisorientierten Vertriebsmitarbeiter (m/w/d), der über herausragende Fähigkeiten in der Akquise im B2B Bereich verfügt. In dieser zentralen Rolle liegt der Fokus darauf, neue Geschäftsmöglichkeiten zu identifizieren, potenzielle Kunden zu kontaktieren und erfolgreiche Verkaufstermine zu vereinbaren. Ihre Aufgabe wird es sein, unser Vertriebsteam mit hochwertigen Leads zu versorgen und somit wesentlich zum Wachstum unseres Unternehmens beizutragen. 
         
        Aufgaben und Verantwortlichkeiten: 
        Proaktive Identifizierung und Ansprache potenzieller Kunden. 
        Durchführung von gezielten Akquisegesprächen per Telefon, E-Mail und anderen Kommunikationskanälen. 
        Überzeugende Präsentation unseres Unternehmens und unserer Produkte/Dienstleistungen, um Interesse zu wecken. 
        Verhandlung von Terminen mit Entscheidungsträgern auf Führungsebene. 
        Kontinuierliche Pflege und Aktualisierung unserer Kunden- und Interessentendatenbank. 
        Enge Zusammenarbeit mit dem Vertriebsteam, um die generierten Leads in Verkaufschancen umzuwandeln. 
        Regelmäßige Berichterstattung über Akquisetätigkeiten und Ergebnisse. 
        Anforderungen: 
        Erfahrung im Vertrieb oder in einer ähnlichen Position mit Schwerpunkt auf Akquise und Terminlegung. 
        Ausgezeichnete kommunikative Fähigkeiten und Überzeugungskraft. 
        Beharrlichkeit und Zielstrebigkeit bei der Erreichung von Akquiszielen. 
        Selbstmotivation und Eigeninitiative. 
        Fähigkeit, in einem schnelllebigen Umfeld zu arbeiten und sich schnell anzupassen. 
        Grundlegendes Verständnis für CRM-Systeme. 
         
        Leistungen: 
        Hohe Provisionstruktur. 
        Möglichkeiten zur beruflichen Weiterentwicklung. 
        Dynamische und inklusive Arbeitsumgebung. 
        Wenn Sie eine spannende Herausforderung in einem wachstumsorientierten Unternehmen suchen und über die genannten Fähigkeiten verfügen, freuen wir uns auf Ihre Bewerbung unter career@nefentus.com`,
  },
  country_manager: {
    title: "Country Manager",
    items: [],
    description: `About Nefentus: 
        Nefentus is a leading provider of innovative online payment solutions, committed to simplifying transactions and enhancing the overall payment experience for businesses and consumers alike. With cutting-edge technology and a customer-centric approach, Nefentus is at the forefront of revolutionizing the digital payments landscape. 
        Position Overview: 
        Nefentus is seeking a dynamic and results-driven Sales Representative to join our growing team. As a Sales Representative, you will play a key role in driving the adoption of Nefentus' online payment solutions among businesses. This is an excellent opportunity for a motivated individual with a passion for sales and the fintech industry to contribute to our success. 
         
        Responsibilities: 
        Prospect and Generate Leads: Identify and reach out to potential clients through various channels to build a robust sales pipeline.Understand Client Needs: Conduct thorough needs assessments to understand the unique requirements of each client and tailor solutions accordingly. 
        Product Knowledge: Stay up-to-date on Nefentus' products and services, and effectively communicate their value proposition to clients.Sales Presentations: Deliver compelling presentations to showcase Nefentus' online payment solutions and demonstrate how they can address clients' pain points. 
        Negotiation and Closing: Work closely with clients to address objections, negotiate terms, and successfully close deals.Relationship Building: Build and maintain strong, long-lasting relationships with clients to foster repeat business and referrals. 
         
        Qualifications: 
        Proven Sales Experience: Minimum of 2 years of successful sales experience, preferably in the fintech or payments industry.Fintech Knowledge: Familiarity with online payment solutions, e-commerce, and financial technology. 
        Excellent Communication Skills: Strong verbal and written communication skills with the ability to articulate complex concepts in a clear and concise manner.Results-Oriented: A track record of meeting and exceeding sales targets. 
        Team Player: Collaborative mindset with the ability to work effectively within a team.Adaptability: Comfortable working in a fast-paced and dynamic environment. 
         
         
        Benefits: 
        High commission structureProfessional development opportunities 
        Dynamic and inclusive work environment 
        If you are a passionate and results-driven individual looking to make a significant impact in the online payment solutions space, we invite you to apply. Join Nefentus and be part of the future of digital payments! 
         
        How to Apply: 
        Please submit your resume and a cover letter outlining your relevant experience and explaining why you are the ideal candidate for this position to career@nefentus.com`,
  },
};

const JobBody = () => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [comment, setComment] = useState("");
  const [params, setParams] = useSearchParams();
  const [job, setJob] = useState(jobs[params.get("key")]);
  const [spinner, setSpinner] = useState(false);
  const backendApi = new backendAPI();
  const { setInfoMessage, setErrorMessage } = useContext(MessageContext);

  const apply = async () => {
    if (!spinner) {
      if (!firstName) {
        setErrorMessage(t("messages.validation.firstName"));
        return;
      }
      if (!lastName) {
        setErrorMessage(t("messages.validation.lastName"));
        return;
      }
      if (!email || !validateEmail(email)) {
        setErrorMessage(t("messages.validation.email"));
        return;
      }
      setSpinner(true);
      const res = await backendApi.contact(
        job.title,
        firstName,
        lastName,
        email,
        linkedin,
        comment,
      );
      if (res) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setLinkedin("");
        setComment("");
      } else {
        setErrorMessage("Network error");
      }
      setSpinner(false);
    }
  };

  return (
    <div className={`container ${styles.jobBody}`}>
      <div className={styles.heading}>
        <h1>{job.title}</h1>
        <a href="#apply">{t("vacancy.apply")}</a>
      </div>
      <div className={styles.body}>
        <div className={styles.feature}>
          {job.items.map((item) => {
            return <p>{item}</p>;
          })}
        </div>
        <div className={styles.description}>
          {job.description.split("\n").map((para) => {
            return <p>{para}</p>;
          })}
        </div>
        <div></div>
        <div className={styles.contact} id="apply">
          <p
            style={{
              fontSize: "2rem",
            }}
          >
            {t("vacancy.apply")}
          </p>
          <div className={styles.row}>
            <Input
              label={t("vacancy.firstName")}
              value={firstName}
              setState={setFirstName}
              placeholder={`John`}
              dashboard
            />
            <Input
              label={t("vacancy.lastName")}
              value={lastName}
              setState={setLastName}
              placeholder={`Doe`}
              dashboard
            />
          </div>
          <Input
            label={t("vacancy.email")}
            value={email}
            setState={setEmail}
            placeholder={`yourmail@mail.com`}
            dashboard
          />
          <Input
            label={t("vacancy.linkedin")}
            value={linkedin}
            setState={setLinkedin}
            placeholder={`https://linkedin/xyz`}
            dashboard
          />
          <Textarea
            label={t("vacancy.comment")}
            value={comment}
            setState={setComment}
            placeholder={``}
            dashboard
          />
          <Button style={{ width: "100%" }} spinner={spinner} onClick={apply}>
            {t("vacancy.apply")}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default JobBody;

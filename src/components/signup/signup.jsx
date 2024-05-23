import Button from "../button/button";
import Input, { SearchOptions } from "../input/input";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import backendAPI from "../../api/backendAPI";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageContext } from "../../context/message";
import MessageComponent from "../message";
import isMobilePhone from "../../func/isMobilePhone";
import Error from "../error/error";
import { NefentusLogo } from "../../assets/icon/logos/logos";
import { useTheme } from "../../context/themeContext/themeContext";
import { useAuth } from "../../context/auth/authContext";
import { validateEmail } from "../../utils";
import { countryList } from "../../constants";

const Signup = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (countryList?.length) setCountries(countryList);
  }, [countryList]);

  const recaptchaRef = useRef();
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);
  const [CountryOption, setCountryOption] = useState("");
  const [spinner, setSpinner] = useState(false);
  const api = new backendAPI();

  const schema = z
    .object({
      firstName: z
        .string()
        .min(1, { message: t("messages.validation.firstName") }),
      lastName: z
        .string()
        .min(1, { message: t("messages.validation.lastName") }),
      telNr: z.string(),
      email: z
        .string()
        .min(1, { message: t("messages.validation.email") })
        .email({ message: t("messages.validation.validEmail") })
        .refine((value) => validateEmail(value)),
      password: z
        .string()
        .min(1, { message: t("messages.validation.password") })
        .min(8, { message: t("messages.validation.validPassword") })
        .refine(
          (value) =>
            /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[.\$\/@!%&*_,#*-+;`])|(?=.*[a-z])(?=.*\d)(?=.*[.\$\/@!%&*_,#*-+;`])|(?=.*[A-Z])(?=.*\d)(?=.*[.\$\/@!%&*_,#*-+;`])|(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.\$\/@!%&*_,#*-+;`])).*$/.test(
              value,
            ),
          {
            message: t("messages.validation.securityPassword"),
          },
        ),
      confirmPassword: z
        .string()
        .nonempty({ message: t("messages.validation.confirmPassword") }),
    })
    .refine(
      (schemaData) => schemaData.password === schemaData.confirmPassword,
      {
        message: t("messages.validation.matchPassword"),
        path: ["confirmPassword"],
      },
    );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), mode: "onSubmit" });

  useEffect(() => {
    if (Object.keys(errors)?.length)
      setErrorMessage(errors[Object.keys(errors)[0]].message);
  }, [errors]);

  const resetForm = () => {
    reset();
    setCountryOption(t("signUp.option1Placeholder"));
  };

  async function submitForm(data) {
    if (spinner) return;
    if (
      CountryOption === t("signUp.option1Placeholder") ||
      !countries.find((country) => country?.value === CountryOption)
    ) {
      setErrorMessage(t("messages.error.country"));
      return;
    }

    const captchaValue = recaptchaRef.current.getValue();

    if (!captchaValue) {
      setErrorMessage(t("messages.error.reCAPTCHA"));
    } else {
      setSpinner(true);

      const requestData = {
        ...data,
        roles: ["Vendor"],
        country: CountryOption,
        affiliateLink: user?.affiliateJoined,
      };

      const response = await api.register(requestData);
      if (response == null) {
        setErrorMessage(t("messages.error.register"));
      } else if (response.status == 409) {
        setErrorMessage(t("messages.error.exist"));
      } else if (response.status == 400) {
        const data = await response.json();
        if (data["firstName"]) {
          if (
            data["firstName"] ==
            "First name must be between 2 and 70 characters"
          ) {
            setErrorMessage(t("messages.validation.validFirstName"));
          } else {
            setErrorMessage(t("messages.validation.firstName"));
          }
        } else if (data["lastName"]) {
          if (
            data["lastName"] == "Last name must be between 2 and 70 characters"
          ) {
            setErrorMessage(t("messages.validation.validLastName"));
          } else {
            setErrorMessage(t("messages.validation.lastName"));
          }
        } else if (data["email"]) {
          if (data["email"] == "Please enter email") {
            setErrorMessage(t("messages.validation.email"));
          } else if (data["email"] == "Please enter valid email") {
            setErrorMessage(t("messages.validation.validEmail"));
          } else {
            setErrorMessage(t("messages.validation.lengthEmail"));
          }
        } else if (data["password"]) {
          if (data["password"] == "Please enter your password") {
            setErrorMessage(t("messages.validation.password"));
          } else if (
            data["password"] == "Password must be between 8 and 70 characters"
          ) {
            setErrorMessage(t("messages.validation.validPassword"));
          } else {
            setErrorMessage(t("messages.validation.securityPassword"));
          }
        } else if (data["country"]) {
          setErrorMessage(t("messages.error.country"));
        } else setErrorMessage(t("messages.error.register"));
      } else {
        setInfoMessage(t("messages.error.confirmEmail"));
        resetForm();
      }
      setSpinner(false);
    }
  }

  return (
    <div className={`${styles.signup}`}>
      <div className={styles.closeWrapper}>
        <Button link={"/"} color={"white"}>
          {t("login.close")}
        </Button>
      </div>
      <div className={styles.left}>
        <NefentusLogo />

        <div>
          <h2>
            {t("signUp.titleP1")}
            <br />
            <span className="gradient">{t("signUp.titleP2")}</span>
          </h2>
          <p>{t("signUp.description")}</p>

          <p>
            {t("signUp.info")}
            <u>
              <Link to="/login">{t("signUp.infoButton")}</Link>
            </u>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(submitForm)} className={styles.right}>
        <MessageComponent />

        <div className={styles.row}>
          <Input
            label={t("signUp.firstNameLabel") + "*"}
            placeholder={t("signUp.firstNamePlaceholder")}
            register={register}
            name={"firstName"}
          />

          <Input
            label={t("signUp.lastNameLabel") + "*"}
            placeholder={t("signUp.lastNamePlaceholder")}
            register={register}
            name={"lastName"}
          />

          <Input
            label={t("signUp.telefonLabel")}
            placeholder="(979) 268-4143"
            register={register}
            name={"telNr"}
          />
          <Input
            label={t("signUp.emailLabel") + "*"}
            placeholder={t("signUp.emailPlaceholder")}
            register={register}
            name={"email"}
          />
          <Input
            label={t("signUp.passwordLabel") + "*"}
            placeholder={t("signUp.passwordPlaceholder")}
            register={register}
            name={"password"}
            secure
          />
          <Input
            label={t("signUp.confirmPasswordLabel") + "*"}
            placeholder={t("signUp.confirmPasswordPlaceholder")}
            register={register}
            name={"confirmPassword"}
            secure
          />
          <SearchOptions
            label={t("signUp.option1Label") + "*"}
            value={CountryOption}
            setValue={setCountryOption}
            options={countries.map((country) => ({
              ...country,
              display: t(country?.display),
            }))}
            placeholder={t("signUp.option1Placeholder")}
          />
        </div>

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.VITE_REACT_APP_RECAPTCHA_SITE_KEY}
          theme={theme}
        />

        <div className={styles.buttonWrapper}>
          <Button className={styles.button} type="submit" spinner={spinner}>
            {t("signUp.formButton")}
          </Button>
        </div>

        <p className={styles.formAgreement}>{t("signUp.formInfo")}</p>
      </form>
    </div>
  );
};

export default Signup;

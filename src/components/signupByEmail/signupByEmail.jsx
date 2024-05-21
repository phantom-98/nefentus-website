import Logo from "../../assets/logo/logo2.svg";
import Input, { Options, SearchOptions } from "../input/input";
import styles from "./signupByEmail.module.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import backendAPI from "../../api/backendAPI";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MessageComponent from "../message";
import { MessageContext } from "../../context/message";
import { z } from "zod";
import isMobilePhone from "../../func/isMobilePhone";
import Popup from "../../dashboardNew/components/popup/popup";
import { useTheme } from "../../context/themeContext/themeContext";
import { useAuth } from "../../context/auth/authContext";
import { countryList } from "../../constants";

const SignupByEmail = () => {
  const recaptchaRef = useRef();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { setErrorMessage } = useContext(MessageContext);
  const [message, setMessage] = useState(null);
  const [CountryOption, setCountryOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const api = new backendAPI();
  const { user, setUser } = useAuth();

  const schema = z
    .object({
      firstName: z
        .string()
        .min(1, { message: t("messages.error.firstNameRequired") }),
      lastName: z
        .string()
        .min(1, { message: t("messages.error.lastNameRequired") }),
      telNr: z
        .string()
        .min(1, { message: t("messages.error.phoneNumberRequired") }),
      password: z
        .string()
        .min(1, { message: t("messages.error.emptyPassword") })
        .min(8, { message: t("messages.error.lengthPassword") })
        .refine(
          (value) =>
            /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[.\$\/@!%&*_,#*-+;`])|(?=.*[a-z])(?=.*\d)(?=.*[.\$\/@!%&*_,#*-+;`])|(?=.*[A-Z])(?=.*\d)(?=.*[.\$\/@!%&*_,#*-+;`])|(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.\$\/@!%&*_,#*-+;`])).*$/.test(
              value,
            ),
          {
            message:
              "Password must include characters from 3 of the following 4 groups: uppercase letters, lowercase letters, numbers, and special characters",
          },
        ),
      confirmPassword: z
        .string()
        .nonempty({ message: "Confirm your password" }),
    })
    .refine(
      (schemaData) => schemaData.password === schemaData.confirmPassword,
      {
        message: t("messages.error.matchPassword"),
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
    if (countryList?.length) setCountries(countryList);
  }, [countryList]);

  useEffect(() => {
    if (user?.firstName === "") setShowModal(true);
  }, []);

  useEffect(() => {
    if (Object.keys(errors)?.length)
      setErrorMessage(errors[Object.keys(errors)[0]].message);
  }, [errors]);

  const resetForm = () => {
    reset();
    setCountryOption(t("signUp.option1Placeholder"));
  };

  const onSubmit = async (data) => {
    if (!user?.email) {
      setErrorMessage(t("messages.error.emailRequired"));
      return;
    }

    if (CountryOption === "") {
      setErrorMessage(t("messages.error.country"));
      return;
    }

    const captchaValue = recaptchaRef.current.getValue();
    if (!captchaValue) {
      setErrorMessage(t("messages.error.reCAPTCHA"));
      return;
    }

    const requestData = {
      ...data,
      email: user?.email,
      roles: ["Vendor"],
      country: CountryOption,
      affiliateLink: user?.affiliateJoined,
    };

    const response = await api
      .updateUserByEmail(requestData)
      .then((res) => {
        setMessage("Please confirm your email address to proceed.");
        setShowModal(false);
        setUser(res);
        resetForm();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <Popup
      show={showModal}
      onConfirm={handleSubmit(onSubmit)}
      confirmTitle={t("signUp.updateButton")}
    >
      <form>
        <MessageComponent />
        {message && (
          <div className={styles.messagecontainer}>
            <p>{message}</p>
          </div>
        )}

        <div className={styles.row}>
          <Input
            label={t("signUp.firstNameLabel") + "*"}
            placeholder={t("signUp.firstNamePlaceholder")}
            register={register}
            name={"firstName"}
            value={firstName}
            setState={setFirstName}
          />

          <Input
            label={t("signUp.lastNameLabel") + "*"}
            placeholder={t("signUp.lastNamePlaceholder")}
            register={register}
            name={"lastName"}
            value={lastName}
            setState={setLastName}
          />

          <Input
            label={t("signUp.telefonLabel")}
            placeholder="(979) 268-4143"
            register={register}
            name={"telNr"}
            value={phoneNumber}
            setState={setPhoneNumber}
          />
          <Input
            label={t("signUp.emailLabel") + "*"}
            placeholder={t("signUp.emailPlaceholder")}
            disabled={true}
            value={user?.email}
          />
          <Input
            label={t("signUp.passwordLabel") + "*"}
            placeholder={t("signUp.passwordPlaceholder")}
            register={register}
            name={"password"}
            value={password}
            setState={setPassword}
            secure
          />
          <Input
            label={t("signUp.confirmPasswordLabel") + "*"}
            placeholder={t("signUp.confirmPasswordPlaceholder")}
            register={register}
            name={"confirmPassword"}
            value={confirmPassword}
            setState={setConfirmPassword}
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
          style={{ marginTop: "2rem" }}
        />
      </form>
    </Popup>
  );
};

export default SignupByEmail;

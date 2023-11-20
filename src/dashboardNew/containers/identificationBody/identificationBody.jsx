import { useState } from "react";
import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./identificationBody.module.css";
import { EditPopup } from "../../components/settings/settingsItem";
import { useTranslation } from "react-i18next";

const IdentificationBody = () => {
  const { t } = useTranslation();

  return (
    <Card className={styles.card}>
      <div className={styles.top}>
        <div className={styles.titleHeader}>
          <SettingsTitle
            title={t("identification.title")}
            description={t("identification.description")}
            identification
          />
        </div>

        <div className={styles.box}>
          <div className={styles.boxTitle}>
            {t("identification.verificationLevels")}
          </div>

          <div className={styles.row}>
            <div className={styles.rowLeft}>
              {t("identification.level").concat("1 :")}{" "}
              <span>{t("identification.level1Description")}</span>
            </div>
            <div
              className={styles.rowRight}
              style={{ color: true ? "#16C172" : "#F24236" }}
            >
              {t("identification.verified")}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowLeft}>
              {t("identification.level").concat("2 :")}
              <span> {t("identification.level2Description")}</span>
            </div>
            <div
              className={styles.rowRight}
              style={{ color: true ? "#16C172" : "#F24236" }}
            >
              {t("identification.verified")}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowLeft}>
              {t("identification.level").concat("3 :")}
              <span> {t("identification.level3Description")}</span>
            </div>
            <div
              className={styles.rowRight}
              style={{ color: !true ? "#16C172" : "#F24236" }}
            >
              {t("identification.unverified")}
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.boxTitle}>
            {" "}
            {t("identification.accountLimit.title")}
          </div>

          <div className={styles.row}>
            <div className={styles.rowLeft}>
              <span>{t("identification.accountLimit.fiatDeposit")}</span>
            </div>
            <div className={styles.rowRight}>
              {"2M USD ".concat(`${t("identification.accountLimit.daily")}`)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowLeft}>
              <span>{t("identification.accountLimit.cryptoDepositLimit")}</span>
            </div>
            <div className={styles.rowRight}>
              {t("identification.unlimited")}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowLeft}>
              <span>{t("identification.accountLimit.cryptoWithdrawal")}</span>
            </div>
            <div className={styles.rowRight}>
              {"8M BUSD ".concat(`${t("identification.accountLimit.daily")}`)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowLeft}>
              <span>{t("identification.accountLimit.transactionLimits")}</span>
            </div>
            <div className={styles.rowRight}>
              {t("identification.unlimited")}
            </div>
          </div>
        </div>

        <div className={styles.uploadBox}>
          <div className={styles.boxTitle}>
            {t("identification.verification.title")}
          </div>

          <div className={styles.uploadItem}>
            <div className={`${styles.row} ${styles.rowItem}`}>
              <div className={styles.rowLeft}>
                {t("identification.level").concat("1:")}
              </div>
            </div>
            <AddText label={t("identification.verification.fullName")} />
            <AddText label={t("identification.verification.address")} />
            <AddText label={t("identification.verification.city")} />
            <AddFile label={t("identification.verification.issueId")} />
            <AddFile label={t("identification.verification.picture")} />
          </div>
          <div className={styles.uploadItem}>
            <div className={`${styles.row} ${styles.rowItem}`}>
              <div className={styles.rowLeft}>
                {t("identification.level").concat("2:")}
              </div>
            </div>
            <AddFile label={t("identification.verification.proofAddress")} />
            <AddFile label={t("identification.verification.proofCompany")} />
          </div>
          <div className={styles.uploadItem}>
            <div className={`${styles.row} ${styles.rowItem}`}>
              <div className={styles.rowLeft}>
                {t("identification.level").concat("3:")}
              </div>
            </div>
            <AddFile label={t("identification.verification.enhanced")} />
          </div>

          <div className={styles.button}>
            <Button>{t("identification.verification.confirm")}</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IdentificationBody;

const AddText = ({ label }) => {
  const [value, setValue] = useState();
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div className={`${styles.row} ${styles.formItem}`}>
        <div className={styles.rowLeft}>
          <span>{label}</span>
        </div>
        <div className={`${styles.rowRight} ${styles.rightUpload}`}>
          <p className={styles.lvl}>{value}</p>
          <Button onClick={() => setShow(true)} color="gray">
            {t("identification.verification.add")}
          </Button>
        </div>
      </div>

      <EditPopup
        show={show}
        setShow={setShow}
        value={value}
        setValue={setValue}
      />
    </>
  );
};

const AddFile = ({ label }) => {
  const [value, setValue] = useState();
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const handleAddFile = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const fileName = selectedFile.name; // Ovo je ime fajla
        const imageURL = URL.createObjectURL(selectedFile);

        setValue(fileName);
      }
    });
  };

  return (
    <>
      <div className={`${styles.row} ${styles.formItem}`}>
        <div className={styles.rowLeft}>
          <span>{label}</span>
        </div>
        <div className={`${styles.rowRight} ${styles.rightUpload}`}>
          <p className={styles.lvl}>{value}</p>
          <Button onClick={handleAddFile} color="gray">
            {t("general.upload")}
          </Button>
        </div>
      </div>
    </>
  );
};

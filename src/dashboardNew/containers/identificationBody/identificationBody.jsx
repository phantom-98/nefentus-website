import { useContext, useEffect, useState } from "react";
import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SettingsTitle from "../../components/settings/settingsTitle";
import backend_API from "../../../api/backendAPI";
import Correct from "../../../assets/icon/correct.svg";

import styles from "./identificationBody.module.css";
import { EditPopup } from "../../components/settings/settingsItem";
import { useTranslation } from "react-i18next";
import adminDashboardApi from "../../../api/adminDashboardApi";
import MessageComponent from "../../../components/message";
import { MessageContext } from "../../../context/message";

const KYC_TYPE = {
  FULL_NAME: "FULL_NAME",
  ADRESS: "ADRESS",
  CITY_AND_ZIP_CODE: "CITY_AND_ZIP_CODE",
  GOVERNMENT_ISSUES_ID: "GOVERNMENT_ISSUES_ID",
  PICTURE_WIDTH_ID_IN_HAND: "PICTURE_WIDTH_ID_IN_HAND",
  PROOF_OF_ADRESS: "PROOF_OF_ADRESS",
  PROOF_OF_COMPANY: "PROOF_OF_COMPANY",
  ENHANCED_DILIGENCE: "ENHANCED_DILIGENCE",
};

const KYC_TYPE_FILE = {
  GOVERNMENT_ISSUES_ID: "GOVERNMENT_ISSUES_ID",
  PICTURE_WIDTH_ID_IN_HAND: "PICTURE_WIDTH_ID_IN_HAND",
  PROOF_OF_ADRESS: "PROOF_OF_ADRESS",
  PROOF_OF_COMPANY: "PROOF_OF_COMPANY",
  ENHANCED_DILIGENCE: "ENHANCED_DILIGENCE",
};

const KYC_TYPE_TEXT = {
  FULL_NAME: "FULL_NAME",
  ADRESS: "ADRESS",
  CITY_AND_ZIP_CODE: "CITY_AND_ZIP_CODE",
};

const KYCContent = [
  {
    id: KYC_TYPE_TEXT.FULL_NAME,
    label: "Full Name",
    type: "text",
    level: 0,
  },
  {
    id: KYC_TYPE_TEXT.ADRESS,
    label: "Adress",
    type: "text",
    level: 0,
  },
  {
    id: KYC_TYPE_TEXT.CITY_AND_ZIP_CODE,
    label: "City and zip code",
    type: "text",
    level: 0,
  },
  {
    id: KYC_TYPE_FILE.GOVERNMENT_ISSUES_ID,
    label: "Government issues id",
    type: "photo",
    level: 0,
  },
  {
    id: KYC_TYPE_FILE.PICTURE_WIDTH_ID_IN_HAND,
    label: "Picture width in hand",
    type: "photo",
    level: 0,
  },
  {
    id: KYC_TYPE_FILE.PROOF_OF_ADRESS,
    label: "Proof of adress",
    type: "photo",
    level: 1,
  },
  {
    id: KYC_TYPE_FILE.PROOF_OF_COMPANY,
    label: "Proof of company",
    type: "photo",
    level: 1,
  },
  {
    id: KYC_TYPE_FILE.ENHANCED_DILIGENCE,
    label: "Enhanced diligence",
    type: "photo",
    level: 2,
  },
];

const INITIAL_FILES = {
  [KYC_TYPE.GOVERNMENT_ISSUES_ID]: null,
  [KYC_TYPE.PICTURE_WIDTH_ID_IN_HAND]: null,
  [KYC_TYPE.PROOF_OF_ADRESS]: null,
  [KYC_TYPE.PROOF_OF_COMPANY]: null,
  [KYC_TYPE.ENHANCED_DILIGENCE]: null,
};

const INITIAL_TEXT = {
  [KYC_TYPE.FULL_NAME]: null,
  [KYC_TYPE.ADRESS]: null,
  [KYC_TYPE.CITY_AND_ZIP_CODE]: null,
};

const IdentificationBody = () => {
  const { t } = useTranslation();

  const [level, setLevel] = useState(null);
  const BackendAPI = new backend_API();
  const adminApi = new adminDashboardApi("admin");
  const [uploadingFiles, setUploadingFiles] = useState(KYCContent);
  const [getData, setGetData] = useState();
  const [getText, setGetText] = useState("");
  const [declineResponse, setDeclineResponse] = useState(null);

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const userId = localStorage.getItem("userId");

  const fetchFYC = async () => {
    const userKYCData = await Promise.all(
      Object.values(KYC_TYPE_FILE).map((type) =>
        BackendAPI.getByKYC(type, userId),
      ),
    );

    const userKYCDataText = await Promise.all(
      Object.values(KYC_TYPE_TEXT).map((type) =>
        BackendAPI.getByKYCText(type, userId),
      ),
    );

    const transformedResults = userKYCData
      ?.map((item) => {
        const key = Object.keys(item)[0];
        return { [key]: item[key].data };
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const transformedResultsText = userKYCDataText
      ?.map((item) => {
        const key = Object.keys(item)[0];
        return { [key]: item[key].data };
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const filteredArray = KYCContent.map((item) => {
      if (item.id in transformedResults) {
        item.rejectReason = transformedResults[item.id].rejectReason;
        item.url = transformedResults[item.id].url;
        item.verify = transformedResults[item.id].verify;

        if (transformedResults[item.id].rejectReason != null) {
          setDeclineResponse(transformedResults[item.id].rejectReason);
        }
      }
      if (item.id in transformedResultsText) {
        item.rejectReason = transformedResultsText[item.id].rejectReason;
        item.url = transformedResultsText[item.id].url;
        item.verify = transformedResultsText[item.id].verify;

        if (transformedResultsText[item.id].rejectReason != null) {
          setDeclineResponse(transformedResultsText[item.id].rejectReason);
        }
      }

      return item;
    });

    setUploadingFiles(filteredArray);
  };

  useEffect(() => {
    const getLevel = async () => {
      const BackendAPI = new backend_API();
      const { data } = await BackendAPI.getKYCLevel(userId);
      if (data) {
        setLevel(data.kycLevel);
      }
    };

    getLevel();
    fetchFYC();
  }, [userId]);

  const handleUpload = async () => {
    if (getData) {
      const arrayWithResults = await Promise.allSettled(
        Object.keys(getData).map((type) =>
          BackendAPI.uploadKYCByType(type, getData[type]),
        ),
      );

      if (arrayWithResults) {
        console.log("successfuly upload file!");
      } else {
        console.log("error upload file!");
      }
    }

    if (getText) {
      const arrayWithResultsText = await Promise.allSettled(
        Object.keys(getText).map((type) =>
          BackendAPI.uploadKYCByText(type, getText[type]),
        ),
      );

      if (arrayWithResultsText) {
        console.log("successfuly upload text!");
      } else {
        console.log("error upload text!");
      }
    }

    setInfoMessage("Data successfuly upload!");
    setDeclineResponse(null);
    fetchFYC();
  };

  return (
    <>
      <MessageComponent />
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
                style={{ color: level > 0 ? "#16C172" : "#F24236" }}
              >
                <span>
                  {level > 0
                    ? t("identification.verified")
                    : t("identification.unverified")}
                </span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLeft}>
                {t("identification.level").concat("2 :")}
                <span> {t("identification.level2Description")}</span>
              </div>
              <div
                className={styles.rowRight}
                style={{ color: level > 1 ? "#16C172" : "#F24236" }}
              >
                <span>
                  {level > 1
                    ? t("identification.verified")
                    : t("identification.unverified")}
                </span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLeft}>
                {t("identification.level").concat("3 :")}
                <span> {t("identification.level3Description")}</span>
              </div>
              <div
                className={styles.rowRight}
                style={{ color: level > 2 ? "#16C172" : "#F24236" }}
              >
                <span>
                  {level > 2
                    ? t("identification.verified")
                    : t("identification.unverified")}
                </span>
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
                {level < 1
                  ? "10 000$"
                  : level < 2
                  ? "1 000 000$"
                  : level < 3
                  ? "10 000 000$"
                  : t("identification.unlimited")}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLeft}>
                <span>
                  {t("identification.accountLimit.cryptoDepositLimit")}
                </span>
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
                {t("identification.unlimited")}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLeft}>
                <span>
                  {t("identification.accountLimit.transactionLimits")}
                </span>
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
                  {level === 0 ? (
                    <p style={{ color: "red", paddingLeft: 10 }}>
                      {declineResponse ? declineResponse : null}
                    </p>
                  ) : null}
                </div>
              </div>

              {KYCContent.map((item) => {
                if (item.type == "text") {
                  return (
                    <AddText
                      id={item.id}
                      label={item.label}
                      getText={getText}
                      setGetText={setGetText}
                      declineResponse={declineResponse}
                      text={item.url}
                      verify={item.verify}
                    />
                  );
                }
                if (item.type == "photo" && item.level === 0) {
                  return (
                    <AddFile
                      id={item.id}
                      label={item.label}
                      declineResponse={declineResponse}
                      file={item.url}
                      verify={item.verify}
                      getData={getData}
                      setGetData={setGetData}
                    />
                  );
                }
              })}
            </div>
            <div className={styles.uploadItem}>
              <div className={`${styles.row} ${styles.rowItem}`}>
                <div
                  className={styles.rowLeft}
                  style={level > 0 ? { color: "white" } : { color: "grey" }}
                >
                  {t("identification.level").concat("2:")}
                  {level === 1 ? (
                    <p style={{ color: "red", paddingLeft: 10 }}>
                      {declineResponse ? declineResponse : null}
                    </p>
                  ) : null}
                </div>
              </div>
              {level < 1 ? (
                <div className={`${styles.row} ${styles.formItem}`}>
                  <div className={styles.rowLeft}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>
                        {t("identification.verification.proofAddress")}
                      </span>
                      <span style={{ paddingTop: 20 }}>
                        {t("identification.verification.proofCompany")}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: 77,
                      justifyContent: "space-between",
                    }}
                  >
                    <Button color="gray">
                      <span
                        style={
                          level > 0 ? { color: "white" } : { color: "grey" }
                        }
                      >
                        {t("general.upload")}
                      </span>
                    </Button>
                    <Button color="gray">
                      <span
                        style={
                          level > 0 ? { color: "white" } : { color: "grey" }
                        }
                      >
                        {t("general.upload")}
                      </span>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {uploadingFiles.map((item) => {
                    if (item.level === 1) {
                      return (
                        <AddFile
                          id={item.id}
                          label={item.label}
                          declineResponse={declineResponse}
                          file={item.url}
                          verify={item.verify}
                          getData={getData}
                          setGetData={setGetData}
                        />
                      );
                    }
                  })}
                </>
              )}
            </div>

            <div className={styles.uploadItem}>
              <div className={`${styles.row} ${styles.rowItem}`}>
                <div
                  className={styles.rowLeft}
                  style={level > 1 ? { color: "white" } : { color: "grey" }}
                >
                  {t("identification.level").concat("3:")}
                  {level === 2 ? (
                    <p style={{ color: "red", paddingLeft: 10 }}>
                      {declineResponse ? declineResponse : null}
                    </p>
                  ) : null}
                </div>
              </div>
              {level < 2 ? (
                <div className={`${styles.row} ${styles.formItem}`}>
                  <div className={styles.rowLeft}>
                    <span>{t("identification.verification.enhanced")}</span>
                  </div>
                  <div>
                    <Button color="gray">
                      <span
                        style={
                          level > 1 ? { color: "white" } : { color: "grey" }
                        }
                      >
                        {t("general.upload")}
                      </span>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {KYCContent.map((item) => {
                    if (item.level === 2) {
                      return (
                        <AddFile
                          id={item.id}
                          label={item.label}
                          declineResponse={declineResponse}
                          file={item.url}
                          verify={item.verify}
                          getData={getData}
                          setGetData={setGetData}
                        />
                      );
                    }
                  })}
                </>
              )}
            </div>
            {/* <AddFile label="Enhanced Diligence" /> */}

            <div className={styles.button}>
              <Button>{t("identification.verification.confirm")}</Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default IdentificationBody;

const AddText = ({
  label,
  id,
  getText,
  setGetText,
  text,
  verify,
  declineResponse,
}) => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const updateValue = value.slice(0, 40);

  const uploadValue = text?.slice(0, 40);

  useEffect(() => {
    if (value) {
      const updatedFiles = { ...getText, [id]: value };
      setGetText(updatedFiles);
    }
  }, [value]);

  return (
    <>
      <div className={`${styles.row} ${styles.formItem}`}>
        <div className={styles.rowLeft}>
          <span>{label}</span>
          {verify ? (
            <div style={{ paddingLeft: 10 }}>
              <img src={Correct} alt="" />
            </div>
          ) : text ? (
            <>
              <span style={{ paddingLeft: 20, color: "gray" }}>
                {declineResponse !== null ? null : "Currently being checked"}
              </span>
            </>
          ) : null}
        </div>
        <div className={`${styles.rowRight} ${styles.rightUpload}`}>
          <p className={styles.lvl}>
            {verify ? (
              <div></div>
            ) : declineResponse != null ? (
              updateValue ? (
                updateValue.length > 39 ? (
                  updateValue + "..."
                ) : (
                  updateValue
                )
              ) : (
                text
              )
            ) : uploadValue ? (
              uploadValue.length > 39 ? (
                uploadValue + "..."
              ) : (
                uploadValue
              )
            ) : updateValue.length > 39 ? (
              updateValue + "..."
            ) : (
              updateValue
            )}
          </p>
          {verify ? (
            <Button color="gray">
              <span style={{ color: "grey" }}>
                {t("identification.verification.add")}
              </span>
            </Button>
          ) : declineResponse != null ? (
            <Button onClick={() => setShow(true)} color="gray">
              {t("identification.verification.add")}
            </Button>
          ) : text ? (
            <Button color="gray">
              <span style={{ color: "grey" }}>
                {t("identification.verification.add")}
              </span>
            </Button>
          ) : (
            <Button onClick={() => setShow(true)} color="gray">
              {t("identification.verification.add")}
            </Button>
          )}
        </div>
      </div>

      <EditPopup
        show={show}
        setShow={setShow}
        value={value}
        setValue={setValue}
        id={id}
      />
    </>
  );
};

const AddFile = ({
  label,
  id,
  file,
  getData,
  setGetData,
  verify,
  declineResponse,
}) => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const [imageURL, setImageURL] = useState(null);

  const updateValue = value.slice(0, 40);

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

        const updatedFiles = { ...getData, [id]: selectedFile };
        setImageURL(imageURL);
        setGetData(updatedFiles);
        setValue(fileName);
      }
    });
  };

  return (
    <>
      <div className={`${styles.row} ${styles.formItem}`}>
        <div className={styles.rowLeft}>
          <span>{label}</span>
          {verify ? (
            <div style={{ paddingLeft: 10 }}>
              <img src={Correct} alt="" />
            </div>
          ) : file ? (
            <>
              <span style={{ paddingLeft: 20, color: "gray" }}>
                {declineResponse !== null ? null : "Currently being checked"}
              </span>
            </>
          ) : null}
        </div>

        <div className={`${styles.rowRight} ${styles.rightUpload}`}>
          {verify ? (
            <div></div>
          ) : declineResponse != null ? (
            imageURL ? (
              <img
                style={{ borderRadius: 5, width: "50px", height: "50px" }}
                src={imageURL}
              />
            ) : file ? (
              <img
                style={{ borderRadius: 5, width: "50px", height: "50px" }}
                src={file}
              />
            ) : (
              <div></div>
            )
          ) : file ? (
            <img
              style={{ borderRadius: 5, width: "50px", height: "50px" }}
              src={file}
            />
          ) : imageURL ? (
            <img
              style={{ borderRadius: 5, width: "50px", height: "50px" }}
              src={imageURL}
            />
          ) : (
            <div></div>
          )}
          {verify ? (
            <Button color="gray">
              <span style={{ color: "grey" }}>{t("general.upload")}</span>
            </Button>
          ) : declineResponse != null ? (
            <Button onClick={() => handleAddFile()} color="gray">
              {t("general.upload")}
            </Button>
          ) : file ? (
            <Button color="gray">
              <span style={{ color: "grey" }}>{t("general.upload")}</span>
            </Button>
          ) : (
            <Button onClick={handleAddFile} color="gray">
              {t("general.upload")}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

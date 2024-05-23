import { useContext, useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
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
import { useTheme } from "../../../context/themeContext/themeContext";
import { checkJwtToken } from "../../../utils";
import { useAuth } from "../../../context/auth/authContext";
import IdentificationPersonalDetail from "../../components/identificationPersonalDetail";

const KYC_TYPE_FILE = {
  GOVERNMENT_ISSUES_ID: "GOVERNMENT_ISSUES_ID",
  PICTURE_WIDTH_ID_IN_HAND: "PICTURE_WIDTH_ID_IN_HAND",
  PROOF_OF_ADRESS: "PROOF_OF_ADRESS",
  PROOF_OF_COMPANY: "PROOF_OF_COMPANY",
  ENHANCED_DILIGENCE: "ENHANCED_DILIGENCE",
};

const KYC_TEXT_TYPES = {
  firstName: "FIRST_NAME",
  lastName: "LAST_NAME",
  address: "ADRESS",
  city: "CITY",
  zip: "ZIP_CODE",
  country: "COUNTRY",
};

const KYCContent = [
  {
    id: "PERSONAL_DETAIL_MODAL",
    label: "identification.verification.personalDetail",
    type: "modal",
    level: 0,
    notRequired: false,
  },
  {
    id: KYC_TYPE_FILE.GOVERNMENT_ISSUES_ID,
    label: "identification.verification.issueId",
    type: "photo",
    level: 0,
  },
  {
    id: KYC_TYPE_FILE.PICTURE_WIDTH_ID_IN_HAND,
    label: "identification.verification.picture",
    type: "photo",
    level: 0,
  },
  {
    id: KYC_TYPE_FILE.PROOF_OF_ADRESS,
    label: "identification.verification.proofAddress",
    type: "photo",
    level: 1,
  },
  {
    id: KYC_TYPE_FILE.PROOF_OF_COMPANY,
    label: "identification.verification.proofCompany",
    type: "photo",
    level: 1,
    notRequired: true,
  },
  {
    id: KYC_TYPE_FILE.ENHANCED_DILIGENCE,
    label: "identification.verification.enhanced",
    type: "photo",
    level: 2,
  },
];

const IdentificationBody = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [level, setLevel] = useState(null);
  const BackendAPI = new backend_API();
  const adminApi = new adminDashboardApi("admin");
  const [uploadingFiles, setUploadingFiles] = useState(KYCContent);
  const [getData, setGetData] = useState([]);
  const [getText, setGetText] = useState([]);
  const [declineResponse, setDeclineResponse] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [personalDetail, setPersonalDetail] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  const [showPersonalDetail, setShowPersonalDetail] = useState(true);

  useEffect(() => {
    if (Object.keys(user)?.length) {
      setPersonalDetail({
        ...personalDetail,
        firstName: user?.firstName,
        lastName: user?.lastName,
        country: user?.country,
      });
    }
  }, [user]);

  useEffect(() => {
    setShowPersonalDetail(
      personalDetail?.address != "" ||
        personalDetail?.city != "" ||
        personalDetail?.zip != "" ||
        personalDetail?.firstName != user?.firstName ||
        personalDetail?.lastName != user?.lastName ||
        personalDetail?.country != user?.country,
    );
  }, [personalDetail]);

  useEffect(() => {
    const init = async () => {
      const getLevel = async () => {
        await checkJwtToken();
        const BackendAPI = new backend_API();
        const { data } = await BackendAPI.getKYCLevel();
        if (data) {
          setLevel(data.kycLevel);
        }
      };

      await getLevel();
    };
    init();
  }, [user.email]);

  useEffect(() => {
    if (level != null) fetchKYC();
  }, [level]);

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const fetchKYC = async () => {
    const userKYCData = await Promise.all(
      Object.values(KYC_TYPE_FILE).map((type) => BackendAPI.getByKYC(type)),
    );

    const userKYCDataText = await Promise.all(
      Object.values(KYC_TEXT_TYPES).map((type) =>
        BackendAPI.getByKYCText(type),
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

    const updatedKeys = {
      FIRST_NAME: "firstName",
      LAST_NAME: "lastName",
      ADRESS: "address",
      ZIP_CODE: "zip",
      COUNTRY: "country",
      CITY: "city",
    };

    if (
      Object.keys(personalDetail)
        ?.map((type) => transformedResultsText[KYC_TEXT_TYPES[type]]?.url)
        .some((data) => data != null)
    ) {
      const personDetail = Object.keys(transformedResultsText).reduce(
        (acc, key) => {
          const renamedKey = updatedKeys[key] || key;
          return {
            ...acc,
            [renamedKey]: transformedResultsText[key]?.url,
            verify: transformedResultsText[key]?.verify,
          };
        },
        {},
      );
      setPersonalDetail({
        ...personDetail,
        verify: Object.keys(personalDetail)
          ?.map((type) => transformedResultsText[KYC_TEXT_TYPES[type]]?.verify)
          ?.filter((filteredData) => filteredData != undefined)
          .every((isVerify) => isVerify),
        // handling pending case
        pending: Object.keys(personalDetail)
          ?.map(
            (type) =>
              transformedResultsText[KYC_TEXT_TYPES[type]]?.rejectReason ==
                null && !transformedResultsText[KYC_TEXT_TYPES[type]]?.verify,
          )
          .every((isPending) => isPending),
      });
    }

    const filteredArray = KYCContent.map((item) => {
      if (item.id in transformedResults) {
        if (
          item.notRequired &&
          (level == 2 ||
            ((!transformedResults[KYC_TYPE_FILE.PROOF_OF_ADRESS].rejectReason ||
              transformedResults[KYC_TYPE_FILE.PROOF_OF_ADRESS].rejectReason ==
                "") &&
              transformedResults[KYC_TYPE_FILE.PROOF_OF_ADRESS].url &&
              !transformedResults[item.id].url))
        ) {
          item.verify = transformedResults[item.id].verify;
          item.url = transformedResults[item.id].url;
          item.rejectReason = "notRequired";
        } else {
          item.rejectReason = transformedResults[item.id].rejectReason;
          item.url = transformedResults[item.id].url;
          item.verify = transformedResults[item.id].verify;
        }

        if (
          transformedResults[item.id].rejectReason != null &&
          item.level == level
        ) {
          setDeclineResponse(transformedResults[item.id].rejectReason);
        }
      }
      if (item.id in transformedResultsText) {
        item.rejectReason = transformedResultsText[item.id].rejectReason;
        item.url = transformedResultsText[item.id].url;
        item.verify = transformedResultsText[item.id].verify;

        if (
          transformedResultsText[item.id].rejectReason != null &&
          item.level == level
        ) {
          setDeclineResponse(transformedResultsText[item.id].rejectReason);
        }
      }

      return item;
    });

    setUploadingFiles(filteredArray);
  };

  const checkPersonalDetail = (item) => {
    return (
      item?.id === "PERSONAL_DETAIL_MODAL" &&
      (personalDetail?.firstName === "" ||
        personalDetail?.lastName === "" ||
        personalDetail?.zip === "" ||
        personalDetail?.country === "" ||
        personalDetail?.address === "")
    );
  };

  const checkUploadingData = () => {
    let res = false,
      confirm = true;
    for (let i = 0; i < KYCContent.length; i++) {
      const item = KYCContent[i];
      if (
        item.level == level &&
        !item.verify &&
        (declineResponse || !item.url)
      ) {
        confirm = false;
      }
      if (
        (item.level == level &&
          item.notRequired == undefined &&
          !item.verify &&
          !item.url &&
          !(getData[item.id] || getText[item.id]) &&
          item?.id != "PERSONAL_DETAIL_MODAL") ||
        (item?.id === "PERSONAL_DETAIL_MODAL" && checkPersonalDetail(item))
      ) {
        res = true;
        setErrorMessage(t(item.label) + t("identification.fieldRequired"));
        break;
      }
    }

    return res || confirm;
  };
  const handleUpload = async () => {
    if (checkUploadingData()) return;

    setSpinner(true);
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
        Object.keys(personalDetail)?.map((type) =>
          BackendAPI.uploadKYCByText(
            KYC_TEXT_TYPES[type],
            personalDetail[type],
          ),
        ),
      );

      if (arrayWithResultsText) {
        console.log("successfuly upload text!");
      } else {
        console.log("error upload text!");
      }
    }
    setInfoMessage(t("identification.uploadSuccess"));
    setDeclineResponse(null);
    fetchKYC();
    setSpinner(false);
  };

  const { theme } = useTheme();

  const handlePersonalDetail = (payload) => {
    setPersonalDetail({ ...payload });
  };

  return (
    <>
      <MessageComponent />
      {/* <ToastContainer /> */}
      <Card
        className={`${styles.card} ${theme !== "dark" ? styles.light : ""} `}
      >
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
                {t("identification.level").concat(" 1: ")}{" "}
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
                {t("identification.level").concat(" 2: ")}
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
                {t("identification.level").concat(" 3: ")}
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
                  {t("identification.level").concat(" 1: ")}
                  {level === 0 ? (
                    <p style={{ color: "red", paddingLeft: 10 }}>
                      {declineResponse ? declineResponse : null}
                    </p>
                  ) : null}
                </div>
              </div>

              {KYCContent.map((item) => {
                const star = item.notRequired ? "" : "*";
                if (item.type == "text") {
                  return (
                    <AddText
                      id={item.id}
                      label={t(item.label).concat(star)}
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
                      label={t(item.label).concat(star)}
                      declineResponse={declineResponse}
                      file={item.url}
                      verify={item.verify}
                      getData={getData}
                      setGetData={setGetData}
                    />
                  );
                }
                if (item.type == "modal" && item.level === 0)
                  return (
                    <AddPersonalDetail
                      item={item}
                      personalDetail={personalDetail}
                      handlePersonalDetail={handlePersonalDetail}
                      declineResponse={declineResponse}
                      showPersonalDetail={showPersonalDetail}
                    />
                  );
              })}
            </div>
            <div className={styles.uploadItem}>
              <div className={`${styles.row} ${styles.rowItem}`}>
                <div
                  className={styles.rowLeft}
                  style={level > 0 ? { color: "white" } : { color: "grey" }}
                >
                  {t("identification.level").concat(" 2: ")}
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
                        {t("identification.verification.proofAddress").concat(
                          "*",
                        )}
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
                    <Button color="gray" fontSize="1rem" width="10rem">
                      <span
                        style={
                          level > 0 ? { color: "white" } : { color: "grey" }
                        }
                      >
                        {t("general.upload")}
                      </span>
                    </Button>
                    <Button color="gray" fontSize="1rem" width="10rem">
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
                    const star = item.notRequired ? "" : "*";
                    if (item.level === 1) {
                      return (
                        <AddFile
                          id={item.id}
                          label={t(item.label).concat(star)}
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
                  {t("identification.level").concat(" 3: ")}
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
                    <span>
                      {t("identification.verification.enhanced").concat("*")}
                    </span>
                  </div>
                  <div>
                    <Button color="gray" fontSize="1rem" width="10rem">
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
                    const star = item.notRequired ? "" : "*";
                    if (item.level === 2) {
                      return (
                        <AddFile
                          id={item.id}
                          label={t(item.label).concat(star)}
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
              <Button
                onClick={handleUpload}
                width="10rem"
                spinner={spinner}
                disabled={level > 2}
              >
                {t("identification.verification.confirm")}
              </Button>
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
    const updatedTexts = { ...getText, [id]: value };
    setGetText(updatedTexts);
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
                {declineResponse && declineResponse != ""
                  ? ""
                  : t("identification.beingChecked")}
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
            <Button color="gray" fontSize="1rem" width="10rem">
              <span style={{ color: "grey" }}>
                {t("identification.verification.add")}
              </span>
            </Button>
          ) : declineResponse && declineResponse != "" ? (
            <Button
              onClick={() => setShow(true)}
              color="gray"
              fontSize="1rem"
              width="10rem"
            >
              {t("identification.verification.add")}
            </Button>
          ) : text ? (
            <Button color="gray" fontSize="1rem" width="10rem">
              <span style={{ color: "grey" }}>
                {t("identification.verification.add")}
              </span>
            </Button>
          ) : (
            <Button
              onClick={() => setShow(true)}
              color="gray"
              fontSize="1rem"
              width="10rem"
            >
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
            file != "notRequired" && (
              <div style={{ paddingLeft: 10 }}>
                <img src={Correct} alt="" />
              </div>
            )
          ) : file ? (
            <>
              <span style={{ paddingLeft: 20, color: "gray" }}>
                {declineResponse && declineResponse != ""
                  ? ""
                  : t("identification.beingChecked")}
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
            <Button color="gray" fontSize="1rem" width="10rem">
              <span style={{ color: "grey" }}>{t("general.upload")}</span>
            </Button>
          ) : declineResponse && declineResponse != "" ? (
            <Button
              onClick={() => handleAddFile()}
              color="gray"
              fontSize="1rem"
              width="10rem"
            >
              {t("general.upload")}
            </Button>
          ) : file ? (
            <Button color="gray" fontSize="1rem" width="10rem">
              <span style={{ color: "grey" }}>{t("general.upload")}</span>
            </Button>
          ) : (
            <Button
              onClick={handleAddFile}
              color="gray"
              fontSize="1rem"
              width="10rem"
            >
              {t("general.upload")}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

const AddPersonalDetail = ({
  item,
  personalDetail,
  handlePersonalDetail,
  declineResponse,
  showPersonalDetail,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div className={`${styles.row} ${styles.formItem}`}>
        <div className={styles.rowLeft}>
          <span>{t(item?.label)}</span>
          {personalDetail?.verify ? (
            <div style={{ paddingLeft: 10 }}>
              <img src={Correct} alt="" />
            </div>
          ) : personalDetail?.pending ? (
            <>
              <span style={{ paddingLeft: 20, color: "gray" }}>
                {declineResponse &&
                declineResponse != "" &&
                !personalDetail?.pending
                  ? ""
                  : t("identification.beingChecked")}
              </span>
            </>
          ) : null}
        </div>

        <div
          className={`${styles.rowRight} ${
            showPersonalDetail && !personalDetail?.verify
              ? styles.rightUpload
              : styles.personalDetailAddButton
          }`}
        >
          {!personalDetail?.verify ? (
            <div>
              {showPersonalDetail &&
                Object.keys(personalDetail)
                  ?.filter(
                    (key) => personalDetail[key] != "" && key != "pending",
                  )
                  ?.map((detail) =>
                    " " + personalDetail[detail]?.length > 70
                      ? personalDetail[detail]?.substring(0, 70) + "..."
                      : personalDetail[detail],
                  )
                  ?.toString()}
            </div>
          ) : null}
          {personalDetail?.verify ? (
            <Button color="gray" fontSize="1rem" width="10rem">
              <span style={{ color: "grey" }}>
                {t("identification.verification.add")}
              </span>
            </Button>
          ) : declineResponse && declineResponse != "" ? (
            <Button
              onClick={() => setOpenModal(true)}
              color="gray"
              fontSize="1rem"
              width="10rem"
            >
              {t("identification.verification.add")}
            </Button>
          ) : personalDetail?.pending ? (
            <Button color="gray" fontSize="1rem" width="10rem">
              <span style={{ color: "grey" }}>
                {t("identification.verification.add")}
              </span>
            </Button>
          ) : (
            <Button
              onClick={() => setOpenModal(true)}
              color="gray"
              fontSize="1rem"
              width="10rem"
            >
              {t("identification.verification.add")}
            </Button>
          )}
        </div>
      </div>

      <IdentificationPersonalDetail
        openModal={openModal}
        closeModal={closeModal}
        spinner={false}
        personalDetail={personalDetail}
        handlePersonalDetail={handlePersonalDetail}
        // setValue={setValue}
        id={item?.id}
      />
    </>
  );
};

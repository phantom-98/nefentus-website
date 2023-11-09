import { useEffect, useState } from "react";
import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SettingsTitle from "../../components/settings/settingsTitle";
import backend_API from "../../../api/backendAPI";

import styles from "./identificationBody.module.css";
import { EditPopup } from "../../components/settings/settingsItem";
import adminDashboardApi from "../../../api/adminDashboardApi";

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

const KYC_TYPE_WITHOUT_TEXT = {
  GOVERNMENT_ISSUES_ID: "GOVERNMENT_ISSUES_ID",
  PICTURE_WIDTH_ID_IN_HAND: "PICTURE_WIDTH_ID_IN_HAND",
  PROOF_OF_ADRESS: "PROOF_OF_ADRESS",
  PROOF_OF_COMPANY: "PROOF_OF_COMPANY",
  ENHANCED_DILIGENCE: "ENHANCED_DILIGENCE",
};

// const KYC_TYPE_TEXT = {
//   FULL_NAME: "FULL_NAME",
//   ADRESS: "ADRESS",
//   CITY_AND_ZIP_CODE: "CITY_AND_ZIP_CODE",
// }

const KYCContent = [
  {
    id: KYC_TYPE.FULL_NAME,
    label: "Full Name",
    type: "text",
    level: 0,
  },
  {
    id: KYC_TYPE.ADRESS,
    label: "Adress",
    type: "text",
    level: 0,
  },
  {
    id: KYC_TYPE.CITY_AND_ZIP_CODE,
    label: "City and zip code",
    type: "text",
    level: 0,
  },
  {
    id: KYC_TYPE.GOVERNMENT_ISSUES_ID,
    label: "Government issues id",
    type: "photo",
    level: 0,
  },
  {
    id: KYC_TYPE.PICTURE_WIDTH_ID_IN_HAND,
    label: "Picture width in hand",
    type: "photo",
    level: 0,
  },
  {
    id: KYC_TYPE.PROOF_OF_ADRESS,
    label: "Proof of adress",
    type: "photo",
    level: 1,
  },
  {
    id: KYC_TYPE.PROOF_OF_COMPANY,
    label: "Proof of company",
    type: "photo",
    level: 1,
  },
  {
    id: KYC_TYPE.ENHANCED_DILIGENCE,
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
  const [level, setLevel] = useState(null);
  const BackendAPI = new backend_API();
  const adminApi = new adminDashboardApi("admin");
  const [uploadingFiles, setUploadingFiles] = useState(INITIAL_FILES);
  const [uploadingText, setUploadingText] = useState(INITIAL_TEXT);
  const [getData, setGetData] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchFYC = async () => {
    const users = await adminApi.getUsers();

    const arrayWithResults = await Promise.all(
      users.map(async (user) => {
        const userId = user.id;

        const userKYCData = await Promise.all(
          Object.values(KYC_TYPE_WITHOUT_TEXT).map((type) =>
            BackendAPI.getByKYC(type, userId),
          ),
        );

        const transformedResults = userKYCData
          ?.map((item) => {
            const key = Object.keys(item)[0];
            return { [key]: item[key].data };
          })
          .reduce((acc, curr) => ({ ...acc, ...curr }), {});

        const filteredArray = KYCContent.map((item) => {
          if (item.id in transformedResults) {
            item.rejectReason = transformedResults[item.id].rejectReason;
          }

          return item;
        });

        setUploadingFiles(filteredArray);
      }),
    );
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
    const arrayWithResults = await Promise.allSettled(
      Object.keys(uploadingFiles).map((type) =>
        BackendAPI.uploadKYCByType(type, uploadingFiles[type]),
      ),
    );

    const arrayWithResultsText = await Promise.allSettled(
      Object.keys(uploadingText).map((type) =>
        BackendAPI.uploadKYCByText(type, uploadingText[type]),
      ),
    );
    if (arrayWithResults?.value) {
      setUploadingFiles(INITIAL_FILES);
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.top}>
        <div className={styles.titleHeader}>
          <SettingsTitle
            title="Identification"
            description="Get your identity verified to buy and trade"
            identification
          />
        </div>

        <div className={styles.box}>
          <div className={styles.boxTitle}>Verification Levels</div>

          <div className={styles.row}>
            <div className={styles.rowLeft}>
              Level 1:{" "}
              <span>
                Personal Information, Government Issued ID and Facial
                Recognition
              </span>
            </div>
            <div
              className={styles.rowRight}
              style={{ color: level > 0 ? "#16C172" : "#F24236" }}
            >
              <span>{level > 0 ? "Verified" : "Unverified"}</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowLeft}>
              Level 2: <span> Proof of Address & Proof of Company</span>
            </div>
            <div
              className={styles.rowRight}
              style={{ color: level > 1 ? "#16C172" : "#F24236" }}
            >
              <span>{level > 1 ? "Verified" : "Unverified"}</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowLeft}>
              Level 3: <span> Enhanced Diligence</span>
            </div>
            <div
              className={styles.rowRight}
              style={{ color: level > 2 ? "#16C172" : "#F24236" }}
            >
              <span>{level > 2 ? "Verified" : "Unverified"}</span>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.boxTitle}>Account Limit</div>

          <div className={styles.row}>
            <div className={styles.rowLeft}>
              <span>Sales volume</span>
            </div>
            <div className={styles.rowRight}>
              {level < 1
                ? "10 000$"
                : level < 2
                ? "1 000 000$"
                : level < 3
                ? "10 000 000$"
                : "Unlimited"}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowLeft}>
              <span>Crypto Deposit</span>
            </div>
            <div className={styles.rowRight}>Unlimited</div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowLeft}>
              <span>Crypto Withdrawal Limit</span>
            </div>
            <div className={styles.rowRight}>Unlimited</div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowLeft}>
              <span>P2P Transaction</span>
            </div>
            <div className={styles.rowRight}>Unlimited</div>
          </div>
        </div>

        <div className={styles.uploadBox}>
          <div className={styles.boxTitle}>Get verified</div>

          <div className={styles.uploadItem}>
            <div className={`${styles.row} ${styles.rowItem}`}>
              <div className={styles.rowLeft}>Level 1:</div>
            </div>

            {KYCContent.map((item) => {
              if (item.type == "text") {
                return (
                  <AddText
                    setUploadingText={setUploadingText}
                    uploadingText={uploadingText}
                    id={item.id}
                    label={item.label}
                  />
                );
              }
              if (item.type == "photo" && item.level === 0) {
                return (
                  <AddFile
                    setUploadingFiles={setUploadingFiles}
                    uploadingFiles={uploadingFiles}
                    id={item.id}
                    label={item.label}
                    rejectReason={item.rejectReason}
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
                Level 2:
              </div>
            </div>
            {level < 1 ? (
              <div className={`${styles.row} ${styles.formItem}`}>
                <div className={styles.rowLeft}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>Proof of Address</span>
                    <span style={{ paddingTop: 20 }}>Proof of Company</span>
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
                      style={level > 0 ? { color: "white" } : { color: "grey" }}
                    >
                      Upload
                    </span>
                  </Button>
                  <Button color="gray">
                    <span
                      style={level > 0 ? { color: "white" } : { color: "grey" }}
                    >
                      Upload
                    </span>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {KYCContent.map((item) => {
                  if (item.level === 1) {
                    return (
                      <AddFile
                        setUploadingFiles={setUploadingFiles}
                        uploadingFiles={uploadingFiles}
                        id={item.id}
                        label={item.label}
                        rejectReason={item.rejectReason}
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
                Level 3:
              </div>
            </div>
            {level < 2 ? (
              <div className={`${styles.row} ${styles.formItem}`}>
                <div className={styles.rowLeft}>
                  <span>Enhanced Diligence</span>
                </div>
                <div>
                  <Button color="gray">
                    <span
                      style={level > 1 ? { color: "white" } : { color: "grey" }}
                    >
                      Upload
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
                        setUploadingFiles={setUploadingFiles}
                        uploadingFiles={uploadingFiles}
                        id={item.id}
                        label={item.label}
                        rejectReason={item.rejectReason}
                      />
                    );
                  }
                })}
              </>
            )}
          </div>

          <div className={styles.button}>
            <Button onClick={handleUpload}>Confirm</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IdentificationBody;

const AddText = ({ label, setUploadingText, id, uploadingText }) => {
  const [value, setValue] = useState();
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={`${styles.row} ${styles.formItem}`}>
        <div className={styles.rowLeft}>
          <span>{label}</span>
        </div>
        <div className={`${styles.rowRight} ${styles.rightUpload}`}>
          <p className={styles.lvl}>{value}</p>
          <Button onClick={() => setShow(true)} color="gray">
            Add
          </Button>
        </div>
      </div>

      <EditPopup
        show={show}
        setShow={setShow}
        value={value}
        setValue={setValue}
        setUploadingText={setUploadingText}
        id={id}
        uploadingText={uploadingText}
      />
    </>
  );
};

const AddFile = ({
  label,
  setUploadingFiles,
  id,
  uploadingFiles,
  rejectReason,
}) => {
  const [value, setValue] = useState();
  const [show, setShow] = useState(false);

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

        const updatedFiles = { ...uploadingFiles, [id]: selectedFile };
        setUploadingFiles(updatedFiles);
        setValue(fileName);
      }
    });
  };

  return (
    <>
      <div className={`${styles.row} ${styles.formItem}`}>
        <div className={styles.rowLeft}>
          <span>{label}</span>
          <span style={{ paddingLeft: 20, color: "red" }}>{rejectReason}</span>
        </div>
        <div className={`${styles.rowRight} ${styles.rightUpload}`}>
          <p className={styles.lvl}>{value}</p>
          <Button onClick={handleAddFile} color="gray">
            Upload
          </Button>
        </div>
      </div>
    </>
  );
};

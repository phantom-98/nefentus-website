import { useEffect, useState } from "react";
import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SettingsTitle from "../../components/settings/settingsTitle";
import backend_API from "../../../api/backendAPI";

import styles from "./identificationBody.module.css";
import { EditPopup } from "../../components/settings/settingsItem";

const IdentificationBody = () => {
  const [level, setLevel] = useState(null);
  const BackendAPI = new backend_API();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getLevel = async () => {
      const BackendAPI = new backend_API();
      const { data } = await BackendAPI.getKYCLevel(userId);
      if (data) {
        setLevel(data.kycLevel);
      }
    };

    getLevel();
  }, [userId]);

  const handleUpload = async () => {
    const arrayWithResults = await Promise.allSettled(
      Object.keys(uploadingFiles).map((type) =>
        BackendAPI.uploadKYCByType(type, uploadingFiles[type]),
      ),
    );
    if (arrayWithResults?.value) {
      fetchFYC();
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
            <AddText label="Full Name" />
            <AddText label="Address" />
            <AddText label="City and Zip Code" />
            <AddFile label="Government Issued ID" />
            <AddFile label="Government Issued ID" />
            <AddFile label="Picture with ID in hand" />
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
                <AddFile label="Proof of Address" />
                <AddFile label="Proof of Company" />
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
              <AddFile label="Enhanced Diligence" />
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

const AddText = ({ label }) => {
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
      />
    </>
  );
};

const AddFile = ({ label }) => {
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
            Upload
          </Button>
        </div>
      </div>
    </>
  );
};

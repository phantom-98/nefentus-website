import styles from "./kyc.module.css";
import Header from "../../../dashboard/header/header";
import Search from "../../../assets/icon/search.svg";
import Correct from "../../../assets/icon/correct.svg";
import Download from "../../../assets/icon/download.svg";
import Button from "../../../components/button/button";
import { useEffect, useState } from "react";
import backendAPI from "../../../api/backendAPI";
import adminDashboardApi from "../../../api/adminDashboardApi";
import TableSearch from "../tableSearch/tableSearch";
import Popup from "../popup/popup";

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

const KycBody = () => {
  const [data, setData] = useState([]);
  const BackendAPI = new backendAPI();
  const adminApi = new adminDashboardApi("admin");

  const fetchFYC = async () => {
    const users = await adminApi.getUsers();

    const arrayWithResults = await Promise.all(
      users.map(async (user) => {
        const userId = user.id;

        const level = await BackendAPI.getKYCLevel(userId);

        const userKYCDataFile = await Promise.all(
          Object.values(KYC_TYPE_FILE).map((type) =>
            BackendAPI.getByKYC(type, userId),
          ),
        );

        const userKYCDataText = await Promise.all(
          Object.values(KYC_TYPE_TEXT).map((type) =>
            BackendAPI.getByKYCText(type, userId),
          ),
        );

        const transformedResults = userKYCDataFile.map((item) => {
          const key = Object.keys(item)[0];
          const fileType = key.replace(/_/g, " ").toLowerCase();
          return {
            type: fileType.charAt(0).toUpperCase() + fileType.slice(1),
            file: item[key].data.url,
            verify: item[key].data.verify,
            typeData: "photo",
          };
        });

        const transformedResultsText = userKYCDataText.map((item) => {
          const key = Object.keys(item)[0];
          const fileType = key.replace(/_/g, " ").toLowerCase();
          return {
            type: fileType.charAt(0).toUpperCase() + fileType.slice(1),
            file: item[key].data.url,
            verify: item[key].data.verify,
            typeData: "text",
          };
        });

        const combinedResults = [
          ...transformedResultsText,
          ...transformedResults,
        ];

        if (
          transformedResults.every(
            (item) =>
              item.file === null ||
              item.file === undefined ||
              item.verify === true,
          ) &&
          transformedResultsText.every(
            (item) =>
              item.file === null ||
              item.file === undefined ||
              item.verify === true,
          )
        )
          return;

        return [
          {
            img: user.s3Url,
            name: `${user.firstName} ${user.lastName}`,
            id: user.id,
          },
          user.email,
          combinedResults,
          user.tel,
          user.business,
          level.data.kycLevel,
          new Date(user.createdAt).toISOString().substring(0, 10),
        ];
      }),
    );
    setData(arrayWithResults.filter((item) => item !== undefined));
  };

  useEffect(() => {
    fetchFYC();
  }, []);

  return (
    <div style={{ marginBottom: "5rem" }}>
      <div className={styles.top}>
        <div className={styles.left}>
          <p style={{ fontSize: "22px", color: "white" }}>KYC Request</p>

          <p style={{ fontSize: "13px" }}>
            Check recent KYC requests and approve or deny users.
          </p>
        </div>
        <TableSearch />
      </div>

      <Table data={data} setData={setData} />
    </div>
  );
};

export default KycBody;

const Table = ({ data, setData }) => {
  const [checkModal, setCheckModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [declineReason, setDeclineReason] = useState("");

  const adminApi = new adminDashboardApi("admin");

  const acceptKYC = async (id) => {
    try {
      await adminApi.acceptKYC(id);
      setData(data.filter((item) => item[0].id !== id));
    } catch {}
  };

  const declineKYC = async (id) => {
    if (declineReason && id) {
      setFeedbackModal(false);
      try {
        await adminApi.declineKYC(id, declineReason);
        setData(data.filter((item) => item[0].id !== id));
      } catch {}
    }
  };

  return (
    <div>
      <div className={`${styles.card} card`}>
        <div className={`${styles.table} dashboard-table`}>
          <div className={styles.tableHead}>
            <ul>
              <li>Name</li>
              <li>Email</li>
              <li>Verify</li>
              <li>Phone</li>
              <li>Business</li>
              <li>Level</li>
              <li>Join On</li>
              <li>Actions</li>
            </ul>
          </div>
          <div className={styles.tableBody}>
            {data.map((items, index) => (
              <ul key={index}>
                {items.map((item, index) => (
                  <div key={index}>
                    {index === 0 ? (
                      <li className={styles.profile}>
                        <div className={styles.profileImage}>
                          <img src={item.img} alt="" />
                        </div>

                        <div className={styles.profileInfo}>
                          <div className={styles.name}>{item.name}</div>
                          <div className={styles.id}>{item.id}</div>
                        </div>
                      </li>
                    ) : index === 2 ? (
                      <li
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setCheckModal(true);
                          setSelectedId(items[0].id);
                        }}
                      >
                        Check
                      </li>
                    ) : (
                      <li>{item}</li>
                    )}
                  </div>
                ))}

                <li>
                  <p onClick={() => acceptKYC(items[0].id)}>Accept</p>
                  <p
                    onClick={() => {
                      setFeedbackModal(true);
                      setSelectedId(items[0].id);
                    }}
                  >
                    Decline
                  </p>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.modalWrapper}>
        {checkModal && (
          <Popup show={true} title="Check verification">
            <div className={styles.modal}>
              <div className={styles.lines}>
                {data
                  .find((item) => {
                    if (Array.isArray(item) && item.length > 0) {
                      const firstElement = item[0];
                      if (
                        firstElement &&
                        typeof firstElement === "object" &&
                        "id" in firstElement
                      ) {
                        return firstElement.id === selectedId;
                      }
                    }
                    return false;
                  })[2]
                  .map((item, index) => (
                    <div>
                      {index === 0 && <h5 className={styles.level}>Level 1</h5>}
                      {index === 5 && <h5 className={styles.level}>Level 2</h5>}
                      {index === 7 && <h5 className={styles.level}>Level 3</h5>}
                      <div className={styles.line} key={index}>
                        <div className={styles.row}>
                          <p>{item.type}</p>
                          {item.verify && <img src={Correct} alt="" />}
                        </div>

                        {item.typeData == "photo" ? (
                          item.file ? (
                            <a href={item.file} download>
                              <img src={Download} alt="" />
                            </a>
                          ) : (
                            <div></div>
                          )
                        ) : (
                          <p>{item.file}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div style={{ paddingTop: 20 }}>
              <Button onClick={() => setCheckModal(false)} color="light">
                Close
              </Button>
            </div>
          </Popup>
        )}
      </div>

      <div className={styles.modalWrapper}>
        {feedbackModal && (
          <Popup show={true} title="Leave a reason">
            <div className={styles.modal}>
              <div className={styles.message}>
                <textarea
                  onChange={(e) => setDeclineReason(e.target.value)}
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>

              <div className={styles.buttons}>
                <Button onClick={() => setFeedbackModal(false)} color="light">
                  Close
                </Button>

                <Button onClick={() => declineKYC(selectedId)} color="white">
                  Confirm
                </Button>
              </div>
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

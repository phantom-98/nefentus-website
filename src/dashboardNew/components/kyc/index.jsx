import styles from "./kyc.module.css";
import Header from "../../../dashboard/header/header";
import Search from "../../../assets/icon/search.svg";
import Correct from "../../../assets/icon/correct.svg";
import Download from "../../../assets/icon/download.svg";
import Button from "../../components/button/button";
import { useEffect, useState } from "react";
import adminDashboardApi from "../../../api/adminDashboardApi";
import TableSearch from "../tableSearch/tableSearch";
import Popup from "../popup/popup";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/themeContext/themeContext";
import moment from "moment";
import { Helmet } from "react-helmet";

const KycBody = () => {
  const [data, setData] = useState([]);
  const adminApi = new adminDashboardApi("admin");
  const { t } = useTranslation();
  const { theme } = useTheme();

  const fetchFYC = async () => {
    const list = await adminApi.getKycs();
    setData(list);
  };

  useEffect(() => {
    fetchFYC();
  }, []);

  return (
    <>
      <Helmet>
        <title>Nefentus | {t("navigation.kyc")}</title>
      </Helmet>
      <div
        style={{ marginBottom: "5rem" }}
        className={`${theme !== "dark" ? "light" : `dark ${styles.darkMode}`}`}
      >
        <div className={styles.top}>
          <div className={styles.left}>
            <div style={{ fontSize: "22px" }}>{t("kyc.kycTitle")}</div>

            <div className={styles.subtitle}>{t("kyc.kycSubTitle")}</div>
          </div>
          <TableSearch />
        </div>

        <Table data={data} setData={setData} />
      </div>
    </>
  );
};

export default KycBody;

const Table = ({ data, setData }) => {
  const [checkModal, setCheckModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [declineReason, setDeclineReason] = useState("");
  const { theme } = useTheme();

  const TextUrlSection = (item, index) => (
    <div>
      {index === 0 && <h5 className={styles.level}>Level 1</h5>}
      <div className={styles.line} key={index}>
        <div className={styles.row}>
          <p>{item?.type}</p>
          <p>{item?.verify ? <img src={Correct} alt="" /> : item?.url}</p>
        </div>
        <p>{item?.rejectReason ?? null}</p>
      </div>
    </div>
  );

  const ImageUrlSection = (item, index) => (
    <div key={index}>
      {index === 2 && <h5 className={styles.level}>Level 2</h5>}
      {index === 4 && <h5 className={styles.level}>Level 3</h5>}
      <div className={styles.line} key={index}>
        <div className={styles.row}>
          <p>{item?.type}</p>
          {item?.verify && item?.url === null && <img src={Correct} alt="" />}
        </div>
        <p>{item?.rejectReason ?? null}</p>

        {item?.url ? (
          <a href={item?.url} download>
            <img src={Download} alt="" />
          </a>
        ) : null}
      </div>
    </div>
  );

  const adminApi = new adminDashboardApi("admin");

  const acceptKYC = async (user) => {
    try {
      await adminApi.acceptKYC(user?.userDetail?.id);
      setData(
        data.filter((item) => item?.userDetail?.id !== user?.userDetail?.id),
      );
    } catch {}
  };

  const declineKYC = async (user) => {
    if (declineReason && user?.userDetail?.id) {
      setFeedbackModal(false);
      try {
        await adminApi.declineKYC(user?.userDetail?.id, declineReason);
        setData(
          data.filter((item) => item?.userDetail?.id !== user?.userDetail?.id),
        );
      } catch {}
    }
  };

  return (
    <div className={`${theme !== "dark" ? "light" : ``}`}>
      <div className={`${styles.card} card`}>
        <div className={`${styles.table} dashboard-table`}>
          <div className={`${styles.tableHead}`}>
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
            {data?.length > 0 &&
              data?.map(
                (items, index) =>
                  items?.userTextUrls?.length > 0 &&
                  items?.userImageUrls?.length > 0 && (
                    <ul key={index}>
                      <li className={styles.profile}>
                        <div className={styles.profileImage}>
                          <img src={items?.userDetail?.s3Url} alt="" />
                        </div>

                        <div className={styles.profileInfo}>
                          <div className={styles.name}>
                            {items?.userDetail?.firstName +
                              " " +
                              items?.userDetail?.lastName}
                          </div>
                          <div className={styles.id}>
                            {items?.userDetail?.id}
                          </div>
                        </div>
                      </li>
                      <li>{items?.userDetail?.email}</li>

                      <li
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setCheckModal(true);
                          setSelectedUser(items);
                        }}
                      >
                        Check
                      </li>

                      <li>{items?.userDetail?.tel}</li>
                      <li>{items?.userDetail?.business}</li>
                      <li>{items?.level}</li>
                      <li>
                        {moment(items?.userDetail?.createdAt).format(
                          "DD-MM-YYYY",
                        )}
                      </li>
                      <li>
                        <p onClick={() => acceptKYC(items)}>Accept</p>
                        <p
                          onClick={() => {
                            setFeedbackModal(true);
                            setSelectedUser(items);
                          }}
                        >
                          Decline
                        </p>
                      </li>
                    </ul>
                  ),
              )}
          </div>
        </div>
      </div>

      <div className={styles.modalWrapper}>
        {checkModal && (
          <Popup show={true} title="Check verification">
            <div className={styles.modal}>
              <div className={styles.lines}>
                {Object.keys(selectedUser)?.length > 0 &&
                  selectedUser?.userTextUrls?.map((doc, index) =>
                    TextUrlSection(doc, index),
                  )}
                {Object.keys(selectedUser)?.length > 0 &&
                  selectedUser?.userImageUrls?.map((doc, index) =>
                    ImageUrlSection(doc, index),
                  )}
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
                <Button onClick={() => setFeedbackModal(false)} color="gray">
                  Close
                </Button>

                <Button onClick={() => declineKYC(selectedUser)}>
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

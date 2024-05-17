import React, { useEffect, useState } from "react";
import { Card, Flex } from "antd";
import InfoMark from "../../../assets/newDashboardIcons/info-circle.svg";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import "./invoiceStatusCard.css";

const statusColor = {
  paid: "#07B561",
  processing: "#F9C43C",
  open: "#078BB9",
};

const InvoiceStatusCard = () => {
  const [invoiceStatuses, setInvoiceStatuses] = useState({});
  const dashboardApi = new vendorDashboardApi();

  useEffect(() => {
    fetchInvoiceStatuses();
  }, []);

  const fetchInvoiceStatuses = async () => {
    const response = await dashboardApi.getInvoiceStatuses();
    if (response?.length)
      setInvoiceStatuses(
        response?.map((invoiceStatus) => ({
          ...invoiceStatus,
          color: statusColor[invoiceStatus?.statusType],
        })),
      );
  };
  return (
    <Card className="invoice-status-card">
      <Flex vertical gap={12}>
        <Flex align="center" gap={12}>
          <div className="default-text-gray sales-invoice-title">Invoices</div>
          <img src={InfoMark} alt="info" width={20} height={20} />
        </Flex>
        <div className="invoice-line-bar-graph">
          {invoiceStatuses?.length > 0 &&
            invoiceStatuses?.map((data, index) =>
              data?.count ? (
                <div
                  className="invoice-line-bar-graph-section"
                  style={{
                    width: `${+data?.percentage}%`,
                    backgroundColor: data?.color,
                  }}
                  key={index}
                ></div>
              ) : null,
            )}
        </div>

        <Flex vertical className="invoice-status-container" gap={12}>
          {invoiceStatuses?.length > 0 &&
            invoiceStatuses?.map((status, index) => (
              <Flex align="center" justify="space-between" gap={8}>
                <Flex align="center" gap={8} key={index}>
                  <div
                    className="invoice-row-color"
                    style={{ background: status?.color }}
                  ></div>
                  <div className="default-text invoice-status-text">
                    {status?.statusType}
                  </div>
                </Flex>
                <Flex align="center" gap={8}>
                  <div className="default-text sales-invoice-title">
                    {status?.count}
                  </div>
                  <div className="default-text-gray sales-invoice-title">
                    ({status?.percentage})
                  </div>
                </Flex>
              </Flex>
            ))}
        </Flex>
      </Flex>
    </Card>
  );
};

export default InvoiceStatusCard;

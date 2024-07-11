import React, { useContext } from "react";
import { Col, Divider, Flex, Typography } from "antd";
import ProductImage from "../../../assets/newDashboardIcons/default-product.svg";
import EditIcon from "../../../assets/newDashboardIcons/edit.svg";
import CopyIcon from "../../../assets/newDashboardIcons/copy.svg";
import DeleteIcon from "../../../assets/newDashboardIcons/delete-gray.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../../context/message";
import "./productCard.css";

const currencySymbol = {
  USD: "$",
  EUR: "€",
  AED: "د.إ",
  UAH: "₴",
  CHF: "CHF",
};

const ProductCard = ({ data, index, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const { Text } = Typography;
  const navigate = useNavigate();
  const { setSuccessMessage } = useContext(MessageContext);

  const onLinkCopy = (link) => {
    navigator.clipboard.writeText(`${window.location.origin}/product/${link}`);
    setSuccessMessage(t("security.scanModal.copyLink"));
  };
  console.log(data);
  return (
    <Col className="gutter-row" span={24} md={12} lg={8} xl={6} key={index}>
      <Flex vertical className="product-card">
        <Flex className="product-header" gap={6} align="center">
          {data?.image ? (
            <img src={data?.image} alt="prd_img" className="product_image" />
          ) : (
            <div className="product-default-image">
              <img src={ProductImage} alt="default" />
            </div>
          )}
          <Text
            className="default-text cursor-pointer product-name"
            onClick={() => onEdit(data)}
          >
            {data?.name}
          </Text>
        </Flex>
        <Flex className="product-body">
          <Flex className="product-body-content">
            <Flex vertical gap={4} flex={1} className="product-unit-block">
              <Text className="default-text-gray product-unit">
                {t("productsDashboard.unit")}
              </Text>
              <Text className="default-text product-price-text">
                {currencySymbol[data?.currency]}

                {data?.price}
              </Text>
            </Flex>
            <Divider type="vertical" className="product-body-block-divider" />
            <Flex vertical gap={4} flex={1} className="product-stock-block">
              <Text className="default-text-gray product-stock-label">
                {t("productsDashboard.stock")}
              </Text>
              <Text className="default-text product-stock-text">
                {data?.stock > -1 ? data?.stock : "∞"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          className="product-footer"
          align="center"
          justify="space-between"
          wrap
          gap={4}
        >
          <Flex gap={8}>
            <div
              className="footer-action-icons cursor-pointer"
              onClick={() => onEdit(data)}
            >
              <img src={EditIcon} alt="icon" />
            </div>
            <div
              className="footer-action-icons cursor-pointer"
              onClick={() => onDelete(data?.link)}
            >
              <img src={DeleteIcon} alt="icon" />
            </div>
          </Flex>
          <Flex
            align="center"
            gap={2}
            className="product-copy-link cursor-pointer"
            onClick={() => onLinkCopy(data?.link)}
          >
            <div>
              <img src={CopyIcon} alt="icon" />
            </div>
            <div className="default-text">
              {t("productsDashboard.copyLink")}
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Col>
  );
};

export default ProductCard;

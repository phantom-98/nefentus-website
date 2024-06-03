import { Flex, Row, Col, Typography, Divider, Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./products.css";
import BagIcon from "../../../assets/newDashboardIcons/shopping-bag.svg";
import GiftIcon from "../../../assets/newDashboardIcons/gift.svg";
import CarIcon from "../../../assets/newDashboardIcons/car.svg";
import AddIcon from "../../../assets/newDashboardIcons/add.svg";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import { useTranslation } from "react-i18next";
import AddProduct from "../../components/addProduct";
import ProductCard from "../../components/productCard";
import DeleteModal from "../../components/deleteModal";
import { MessageContext } from "../../../context/message";
import ProductCardSkeleton from "../../components/productCardSkeleton";

const Products = () => {
  const { Title, Text, Paragraph } = Typography;
  const dashboardApi = new vendorDashboardApi();
  const { setInfoMessage, setErrorMessage } = useContext(MessageContext);
  const [products, setProducts] = useState([]);
  const [dataLength, setDataLength] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [productLink, setProductLink] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loader, setLoader] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetchProducts();
  }, [currentPage, dataLength]);

  useEffect(() => {
    if (Object.keys(selectedProduct)?.length) setOpenDrawer(true);
    else setOpenDrawer(false);
  }, [selectedProduct]);

  const fetchProducts = async (
    search = "",
    current = currentPage,
    length = dataLength,
  ) => {
    setLoader(true);
    const newProducts = await dashboardApi.getProducts(
      current - 1, // 0
      length, // 1000
      search, // ""
    );
    if (newProducts) {
      const newSignedImagePaths = await Promise.all(
        newProducts?.content.map((product) =>
          dashboardApi.getSignedImagePath(product.link),
        ),
      );

      const productData = newProducts?.content.map((item, index) => ({
        ...item,
        price: item.price,
        image: newSignedImagePaths[index],
      }));
      if (productData?.length) {
        // setTotal(newProducts?.totalElements);
        setProducts([...productData]);
      } else setProducts([]);
      setLoader(false);
    }
  };

  const editProduct = (data) => {
    setSelectedProduct(data);
  };

  const deleteProduct = async () => {
    const resp = await dashboardApi.deleteProduct(productLink);
    if (resp) {
      setInfoMessage(t("products.createProductModal.deletedSuccessfully"));
    } else {
      setErrorMessage(t("products.createProductModal.deletedError"));
    }
    setProductLink("");
    setConfirm(false);
    fetchProducts();
  };

  return (
    <div className="product-main-wrapper">
      {confirm && (
        <DeleteModal
          icon={<img src={BagIcon} alt="delete" width={32} />}
          description={t("productsDashboard.deleteProductConfirmation")}
          open={confirm}
          onClose={() => {
            setProductLink("");
            setConfirm(!confirm);
          }}
          onDelete={() => deleteProduct()}
        />
      )}
      {openDrawer && (
        <AddProduct
          open={openDrawer}
          onClose={() => {
            setSelectedProduct({});
            setOpenDrawer(false);
          }}
          isMobile={false}
          reloadProduct={() => {
            setOpenDrawer(false);
            setSelectedProduct({});
            fetchProducts();
          }}
          selectedProduct={selectedProduct}
        />
      )}
      <Row gutter={16}>
        {loader
          ? Array.from({ length: 11 }, (_, index) => index)?.map(
              (val, index) => <ProductCardSkeleton key={index} />,
            )
          : products?.map((data, index) => (
              <ProductCard
                data={data}
                index={index}
                onEdit={(data) => editProduct(data)}
                onDelete={(link) => {
                  setProductLink(link);
                  setConfirm(true);
                }}
              />
            ))}

        <Col className="gutter-row" span={24} md={12} lg={8} xl={6}>
          <Flex vertical className="product-card add-product-card">
            <Flex align="center" gap={12} justify="center">
              <div className="add-product-card-icon">
                <img src={GiftIcon} />
              </div>
              <div className="add-product-card-icon">
                <img src={BagIcon} />
              </div>
              <div className="add-product-card-icon">
                <img src={CarIcon} />
              </div>
            </Flex>
            <Flex align="center" gap={12} vertical>
              <div className="default-text-gray add-product-card-description">
                {t("productsDashboard.addProductDescription")}
              </div>
              <Flex
                align="center"
                gap={3}
                className="add-product-card-button cursor-pointer"
                onClick={() => setOpenDrawer(true)}
              >
                <div>
                  <img src={AddIcon} alt="icon" />
                </div>
                <Text className="default-text-gray">
                  {t("productsDashboard.addProduct")}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default Products;

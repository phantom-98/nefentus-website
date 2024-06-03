import React from "react";
import { Skeleton, Divider, Flex } from "antd";
import "../productCard/productCard.css";

const ProductCardSkeleton = ({ key }) => {
  return (
    <Flex vertical className="product-card" key={key}>
      <Flex className="product-header" gap={6}>
        <Skeleton.Avatar
          active
          size="large"
          shape="square"
          className="product_image"
        />
        <Skeleton.Input active className="product-name" size="small" />
      </Flex>
      <Flex className="product-body">
        <Flex className="product-body-content">
          <Flex vertical gap={4} flex={1} className="product-unit-block">
            <Skeleton.Input active className="product-unit" size="small" />
            <Skeleton.Input
              active
              className="product-price-text"
              size="small"
            />
          </Flex>
          <Divider type="vertical" className="product-body-block-divider" />
          <Flex vertical gap={4} flex={1} className="product-stock-block">
            <Skeleton.Input
              active
              className="product-stock-label"
              size="small"
            />
            <Skeleton.Input
              active
              className="product-stock-text"
              size="small"
            />
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
          <Skeleton.Avatar
            active
            shape="circle"
            size="small"
            className="footer-action-icons"
          />
          <Skeleton.Avatar
            active
            shape="circle"
            size="small"
            className="footer-action-icons"
          />
        </Flex>
        <Flex align="center" gap={2} className="product-copy-link">
          <Skeleton.Avatar active shape="circle" size="small" />
          <Skeleton.Input active size="small" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCardSkeleton;

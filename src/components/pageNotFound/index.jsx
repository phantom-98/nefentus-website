import { Button, Flex } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./pageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Flex className="page-not-found" align="center" justify="center">
      <Flex vertical gap={16} className="page-not-found-container">
        <div className="default-text page-not-found-title">
          Error: Page Not Found
        </div>
        <Flex vertical gap={8}>
          <div className="default-text-gray">
            Oops! It looks like the page you're trying to access doesn't exist
            or has been removed. Please check the URL and try again.
          </div>
          <div className="default-text-gray">
            If you believe this is an error or need assistance, please contact
            our support team for help.
          </div>
          <div className="default-text-gray">Thank you for using Nefentus!</div>

          <Button
            className="default-text page-back-to-home"
            onClick={() => navigate("/")}
          >
            Back to home page
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageNotFound;

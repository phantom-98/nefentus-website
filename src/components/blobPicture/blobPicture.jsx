import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/authContext";

const BlobPicture = () => {
  const [base64Data, setBase64Data] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    setBase64Data(user?.profileImage);
  }, [user?.profileImage]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {base64Data !== "null" && (
        <img src={`${base64Data}`} style={{ height: "100%", width: "100%" }} />
      )}
    </div>
  );
};

export default BlobPicture;

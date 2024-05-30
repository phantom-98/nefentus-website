import { useState, useEffect, useCallback } from "react";

const useResponsive = (isDashboard = false) => {
  const [columns, setColumns] = useState(getInitialColumns(isDashboard));
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 380 && isDashboard) {
      setColumns(1);
    } else if (window.innerWidth <= 678 && isDashboard) {
      setColumns(2);
    } else {
      setColumns(isDashboard ? 4 : 2);
    }
    setScreenWidth(window.innerWidth);
  }, [isDashboard]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Initial call to set columns based on the current window size
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return { columns, screenWidth, handleResize };
};

const getInitialColumns = (isDashboard) => {
  if (typeof window === "undefined") {
    return isDashboard ? 4 : 2;
  }
  if (window.innerWidth <= 380 && isDashboard) {
    return 1;
  } else if (window.innerWidth <= 678 && isDashboard) {
    return 2;
  } else {
    return isDashboard ? 4 : 2;
  }
};

export default useResponsive;

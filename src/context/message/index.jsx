import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../themeContext/themeContext";

export const MessageContext = createContext({
  infoMessage: undefined,
  errorMessage: undefined,
  setInfoMessage: () => {
    alert("Init");
  },
  setErrorMessage: () => {},
});

export function MessageContextProvider({ children }) {
  const { theme } = useTheme();
  const [infoMessage, setInfoMessage] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);

  function setInfoMessageClear(message, duration = 5000) {
    // setErrorMessage(undefined);
    // setInfoMessage(message);
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
      theme: theme,
    });
  }

  function setErrorMessageClear(message, duration = 5000) {
    // setInfoMessage(undefined);
    // setErrorMessage(message);
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
      theme: theme,
    });
  }

  function clearMessages() {
    setInfoMessage(undefined);
    setErrorMessage(undefined);
  }

  return (
    <MessageContext.Provider
      value={{
        infoMessage: infoMessage,
        errorMessage: errorMessage,
        setInfoMessage: setInfoMessageClear,
        setErrorMessage: setErrorMessageClear,
        clearMessages: clearMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

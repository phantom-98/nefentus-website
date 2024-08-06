import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const MessageContext = createContext({
  infoMessage: undefined,
  errorMessage: undefined,
  setInfoMessage: () => {
    alert("Init");
  },
  setErrorMessage: () => {},
});

export function MessageContextProvider({ children }) {
  const [infoMessage, setInfoMessage] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  function setSuccessMessageClear(message, duration = 5000) {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
    });
  }

  function setInfoMessageClear(message, duration = 5000) {
    // setErrorMessage(undefined);
    // setInfoMessage(message);
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
    });
  }

  function setErrorMessageClear(message, duration = 5000) {
    // setInfoMessage(undefined);
    // setErrorMessage(message);
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
    });
  }

  function clearMessages() {
    setInfoMessage(undefined);
    setErrorMessage(undefined);
    setSuccessMessage(undefined);
  }

  return (
    <MessageContext.Provider
      value={{
        infoMessage: infoMessage,
        errorMessage: errorMessage,
        successMessage: successMessage,
        setSuccessMessage: setSuccessMessageClear,
        setInfoMessage: setInfoMessageClear,
        setErrorMessage: setErrorMessageClear,
        clearMessages: clearMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

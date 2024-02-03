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

  function setInfoMessageClear(message, duration = 5000) {
    // setErrorMessage(undefined);
    // setInfoMessage(message);
    toast.info(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
      theme: "colored",
    });
  }

  function setErrorMessageClear(message, duration = 5000) {
    // setInfoMessage(undefined);
    // setErrorMessage(message);
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
      theme: "colored",
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

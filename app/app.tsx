// App.tsx or index.tsx
import React, { useState } from "react";
import { View, Text } from "react-native";
import ToastContainer from "@/component/reusable/ToastComponent";

const App = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };
  return (
    <>
      {/* Your app content */}
      <ToastContainer
        message="Success! Your action was completed."
        type="success"
        visible={toastVisible}
        onClose={hideToast}
      />
    </>
  );
};

export default App;

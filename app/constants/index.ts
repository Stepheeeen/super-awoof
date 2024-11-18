import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseUrl = "https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1";

export const showToast = (message: string, type: "success" | "error") => {
  Toast.show({
    type,
    text1: message,
  });
};

export const Profile = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    
    if (!token) {
      showToast("No access token found", "error");
      return null;
    }

    const res = await axios.get(`${baseUrl}/account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      showToast(errorMessage, "error");
    } else {
      showToast("Unexpected error", "error");
    }
    return null;
  }
};
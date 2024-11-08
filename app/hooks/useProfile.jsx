import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../constants/index";

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (!accessToken) return; // Exit if no token found

        const { data } = await axios.get(`${baseUrl}/account`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUserProfile(data);
        await AsyncStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return userProfile;
};

export default useUserProfile;

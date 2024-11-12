import { DefaultInput } from "@/component/reusable/Input";
import { useEffect, useState } from "react";
import TabBar from "@/component/reusable/TabBar";
import { Image, Pressable, Text, View, Alert } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import tailwind from "twrnc";
import Modal from "@/component/reusable/Modal";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { baseUrl } from "@/app/constants";
import Toast from "react-native-toast-message";

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [profile, setProfile] = useState("Email");

  const router = useRouter();

  // API Endpoint URLs
  const logoutUrl = `${baseUrl}/account/logout`;
  const deleteAccountUrl = `${baseUrl}/account/`;
  const getProfileUrl = `${baseUrl}/account`;

  useEffect(() => {
    const getLoginMode = async () => {
      const access = await AsyncStorage.getItem("accessToken");
      try {
        const response = await axios.get(getProfileUrl, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        setProfile(response?.data?.loginMode);
      } catch (error) {
        console.log("error getting loginMode", error);
      }
    };

    getLoginMode();
  }, [profile]);

  useEffect(() => {
    const getDataAndProfile = async () => {
      try {
        // First, get the tokens from AsyncStorage
        const refresh = await AsyncStorage.getItem("refreshToken");
        const access = await AsyncStorage.getItem("accessToken");

        if (refresh) {
          setRefreshToken(refresh);
        }
        if (access) {
          setAccessToken(access);
        }

        // If accessToken is available, fetch profile data
        if (access) {
          try {
            const response = await axios.get(getProfileUrl, {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            });
            // console.log("Profile data:", response.data);

            // Extract loginMode and pass it to Profile
            setProfile(response.data.loginMode);
          } catch (e) {
            console.error("Error fetching profile data:", e);
          }
        } else {
          console.error("No access token found.");
        }
      } catch (e) {
        console.error("Error reading token from AsyncStorage:", e);
      }
    };
    getDataAndProfile();
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        logoutUrl,
        {},
        {
          headers: { Authorization: `Bearer ${refreshToken}` },
        }
      );
      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Logged out successfully",
        });
        // Alert.alert("Success", "Logged out successfully");
        router.push("/Auth/signin/email/");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      Toast.show({
        type: "error",
        text1: "Failed to log out",
      });
    }
  };

  // Delete Account Function
  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(deleteAccountUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Account deleted successfully",
        });
        // Alert.alert("Success", "Account deleted successfully");
        router.push("/Auth/signup/email/");
      }
    } catch (error) {
      console.error("Delete Account Error:", error);
      Toast.show({
        type: "error",
        text1: "Failed to delete account",
      });
      // Alert.alert("Error", "");
    }
  };

  return (
    <>
      <View style={tailwind`h-full bg-[#0F1219] w-full`}>
        <View
          style={tailwind`flex flex-row items-center w-full justify-between px-5 py-6 h-[13%] absolute top-0 bg-[#0F1219] z-10 `}
        >
          <Image
            source={require("../../../assets/images/favicon.png")}
            style={tailwind`w-[50px] h-[50px]`}
          />
          <Text
            style={tailwind`ml-[-15px] font-semibold text-[22px] text-white`}
          >
            Profile
          </Text>
          <Pressable
            style={tailwind`flex flex-row items-center py-[2px] px-2 rounded`}
            onPress={() => {}}
          ></Pressable>
        </View>

        <View style={tailwind`mt-[20%] py-6 w-full`}>
          <Pressable
            style={tailwind`flex flex-row items-center w-full justify-between py-3 px-5`}
            onPress={() => {
              console.log(profile);
              router.push(
                profile === "Phone"
                  ? "/Pages/Profile/ViewProfile/phone-number/"
                  : "/Pages/Profile/ViewProfile/email/"
              );
            }}
          >
            <View style={tailwind`flex flex-row items-center`}>
              <AntDesign name="profile" size={25} color="white" />
              <Text style={tailwind`text-white text-[18px] ml-3`}>
                View Profile
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={25} color="white" />
          </Pressable>

          <Pressable
            style={tailwind`flex flex-row items-center w-full justify-between py-3 px-5 mt-1 mb-3`}
            onPress={() => {
              router.push("/Auth/passwordReset/");
            }}
          >
            <View style={tailwind`flex flex-row`}>
              <MaterialIcons name="lock-reset" size={25} color="white" />
              <Text style={tailwind`text-white text-[18px] ml-3`}>
                Update Password
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={25} color="white" />
          </Pressable>

          <View
            style={tailwind`w-[87%] mx-auto my-5 h-[1px] bg-[#343434]`}
          ></View>

          <Pressable
            style={tailwind`flex flex-row items-center w-full justify-between py-3 px-5 mt-3`}
            onPress={() => setModalVisible(true)}
          >
            <View style={tailwind`flex flex-row`}>
              <Feather name="power" size={23} color="white" />
              <Text style={tailwind`text-white text-[18px] ml-3`}>Logout</Text>
            </View>
            <MaterialIcons name="navigate-next" size={25} color="white" />
          </Pressable>

          <Pressable
            style={tailwind`flex flex-row items-center w-full justify-between py-3 px-5 my-1`}
            onPress={() => setDeleteAccount(true)}
          >
            <View style={tailwind`flex flex-row items-center ml-[-4px]`}>
              <EvilIcons name="trash" size={30} color="#Ff4757" />
              <Text style={tailwind`text-[#Ff4757] text-[18px] ml-2 mt-1`}>
                Delete Account
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={25} color="#Ff4757" />
          </Pressable>
        </View>

        <Modal
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          ButtonText={"Log out"}
          HeadText={
            <Text
              style={tailwind`text-white text-[22px] font-semibold mt-[-25px]`}
            >
              Logging Out?
            </Text>
          }
          SubText="Are you sure you want to log out from your SupaAwoof account?"
          handleClick={handleLogout}
          cancelText={
            <Text style={tailwind`underline my-2 text-white`}>No, Cancel</Text>
          }
          ModalHeadText=""
        />

        <Modal
          modalVisible={deleteAccount}
          onClose={() => setDeleteAccount(false)}
          ButtonText={"Delete Account"}
          HeadText={
            <Text
              style={tailwind`text-white text-[22px] font-semibold mt-[-25px]`}
            >
              Delete Account?
            </Text>
          }
          SubText="Are you sure you want to delete your SupaAwoof account?"
          handleClick={handleDeleteAccount}
          cancelText={
            <Text style={tailwind`underline my-2 text-white`}>No, Cancel</Text>
          }
          ModalHeadText=""
        />

        <TabBar />
      </View>
    </>
  );
};

export default Index;

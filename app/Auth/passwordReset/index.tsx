import { DefaultButton } from "@/component/reusable/Button";
import { PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import tailwind from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import TabBar from "@/component/reusable/TabBar";

const Index = () => {
  const router = useRouter();
  const apiUrl = 'https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/update/password';

  // State for old and new password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    try {
      const emailReset = await AsyncStorage.getItem("passwordEmailReset");

      const response = await axios.put(apiUrl, {
        email: emailReset,
        old_password: oldPassword, // Old password field
        new_password: newPassword, // New password field
      });

      if (response.status === 200) {
        // Password update successful
        router.push("/Auth/signin/email");
      } else {
        // Handle errors (e.g., invalid password or other issues)
        setErrorMessage(response.data.message || "An error occurred. Please try again.");
      }
    } catch (error:any) {
      console.log('Error during password update:', error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5 overflow-scroll`}>
      <ScrollView
        style={tailwind`flex-1`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tailwind`w-full mt-[5%] mb-4 px-3`}>
          <Text style={tailwind`text-white font-bold text-[27px]`}>
            Update Password
          </Text>
          <Text style={tailwind`text-white font-normal text-[18px] mt-2 mb-4`}>
            Please enter your old password and your new password
          </Text>
        </View>

        {errorMessage ? (
          <Text style={tailwind`text-red-500 text-center mb-4`}>{errorMessage}</Text>
        ) : null}

        <PasswordInput
          onChangeText={setOldPassword}
          value={oldPassword}
          placeholder="Old Password"
          label="Old Password"
          customCss="mt-3 w-[95%] mx-auto"
          hidden="opacity-0"
          onPress={""}
        />

        <PasswordInput
          onChangeText={setNewPassword}
          value={newPassword}
          placeholder="New Password"
          label="New Password"
          customCss="mt-3 w-[95%] mx-auto"
          hidden="opacity-0"
          onPress={""}
        />

        <PasswordInput
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm New Password"
          label="Confirm New Password"
          customCss="mt-3 w-[95%] mx-auto"
          hidden="opacity-0"
          onPress={""}
        />
        <View style={tailwind`mt-10 w-[95%] mx-auto`}>
          <DefaultButton
            onPress={handlePasswordUpdate}
            text="Update Password"
          />
        </View>
      </ScrollView>

      <TabBar/>
    </View>
  );
};

export default Index;

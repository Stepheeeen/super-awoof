import { DefaultButton } from "@/component/reusable/Button";
import { PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View, Alert } from "react-native";
import tailwind from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const resetPasswordUrl =
    "https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/password-reset";

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const email = await AsyncStorage.getItem("passwordEmailReset");
    const otp = await AsyncStorage.getItem("passwordResetOTP");

    console.log(email, otp)

    try {
      const response = await axios.post(resetPasswordUrl, {
        email: email,
        otp: otp,
        password: password,
      });

      if (response.status === 200) {
        Alert.alert("Success", "Password has been successfully reset.");
        router.push("/Auth/signin/email");
      }
    } catch (error: any) {
      console.error("Error resetting password:", error.response?.data);
      Alert.alert("Error", "Password reset failed. Please try again.");
    }
  };

  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
      <ScrollView>
        <View style={tailwind`w-full mt-[10%] mb-6 px-3`}>
          <Text style={tailwind`text-white font-bold text-[27px]`}>
            Create New Password
          </Text>
          <Text style={tailwind`text-white font-normal text-[18px] mt-2`}>
            Your new password must be different from the previous one.
          </Text>
        </View>

        <PasswordInput
          hidden="hidden"
          onPress={() => {}}
          onChangeText={setPassword}
          value={password}
          label="Password"
          placeholder="Enter password"
          customCss="w-[95%] mx-auto"
        />

        <PasswordInput
          onChangeText={setConfirmPassword}
          hidden="hidden"
          onPress={() => {}}
          value={confirmPassword}
          label="Confirm Password"
          placeholder="Confirm password"
          customCss="w-[95%] mx-auto"
        />

        <View style={tailwind`mt-10 w-[95%] mx-auto`}>
          <DefaultButton onPress={handlePasswordReset} text="Set Password" />
        </View>
      </ScrollView>
    </View>
  );
};

export default NewPassword;

import { DefaultButton } from "@/component/reusable/Button";
import { PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import tailwind from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const router = useRouter();
  const apiUrl = 'https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/password-reset';

  // State for password and confirm password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const resetDetails = async () => {
      try {
        const emailReset = await AsyncStorage.getItem("passwordEmailReset");
        const resetOTP = await AsyncStorage.getItem("passwordResetOTP");
        // You may want to handle the retrieved values here if needed
      } catch (error) {
        console.log('Error in getting details', error);
      }
    };
    resetDetails(); // Call the async function
  }, []);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const emailReset = await AsyncStorage.getItem("passwordEmailReset");
      const resetOTP = await AsyncStorage.getItem("passwordResetOTP");

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailReset,
          otp: resetOTP,
          password: newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Password reset successful
        router.push("/Auth/signin/email");
      } else {
        // Handle errors (e.g., invalid OTP or password)
        setErrorMessage(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.log('Error during password reset:', error);
      setErrorMessage("An error occurred. Please try again.");
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
            Create New Password
          </Text>
          <Text style={tailwind`text-white font-normal text-[18px] mt-2 mb-4`}>
            Please enter a new password
          </Text>
        </View>

        {errorMessage ? (
          <Text style={tailwind`text-red-500 text-center mb-4`}>{errorMessage}</Text>
        ) : null}

        <PasswordInput
          onChangeText={setNewPassword}
          value={newPassword}
          placeholder="Enter Password"
          label="New Password"
          customCss="mt-3 w-[95%] mx-auto"
          hidden="opacity-0"
          onPress={""}
        />
        <PasswordInput
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
          label="Confirm Password"
          customCss="mt-3 w-[95%] mx-auto"
          hidden="opacity-0"
          onPress={""}
        />

        <View style={tailwind`mt-10 w-[95%] mx-auto`}>
          <DefaultButton
            onPress={handlePasswordReset}
            text="Reset"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Alert, View, Text } from "react-native";
import tailwind from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  // API Endpoint for requesting a password reset
  const requestPasswordResetUrl =
    "https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/request-password-reset";

  // Function to handle password reset request
  const handleRequestReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter a valid email or phone number.");
      return;
    }

    try {
      const response = await axios.post(requestPasswordResetUrl, { email });

      if (response.status === 200) {
        Alert.alert("Success", "A password reset link has been sent to your email.");
        await AsyncStorage.setItem("passwordEmailReset", email); // Store email in AsyncStorage
        router.push("/Auth/forgotPassword/OTP");
      }
    } catch (error) {
      console.error("Error requesting password reset:", error);
      Alert.alert("Error", "Failed to send reset link. Please check your email.");
    }
  };

  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
      <View style={tailwind`w-full mt-[10%] mb-6 px-3`}>
        <Text style={tailwind`text-white font-bold text-[27px]`}>
          Reset Your Password
        </Text>
        <Text style={tailwind`text-white font-normal text-[18px] mt-2 mb-4`}>
          Enter your email address and we’ll send you a password reset link
        </Text>
      </View>

      <DefaultInput
        onChangeText={setEmail}
        value={email}
        label="Email Address"
        placeholder="email/phone number"
        customCss="w-[95%] mx-auto"
      />

      <View style={tailwind`mt-10 w-[95%] mx-auto`}>
        <DefaultButton onPress={handleRequestReset} text="Reset" />
      </View>
    </View>
  );
};

export default ForgotPassword;
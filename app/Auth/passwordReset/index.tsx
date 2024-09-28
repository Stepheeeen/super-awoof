import axios from "axios";
import tailwind from "twrnc";
import { useState } from "react";
import { useRouter } from "expo-router";
import IonIcons from "@expo/vector-icons/Ionicons";
import { DefaultInput } from "@/component/reusable/Input";
import { DefaultButton } from "@/component/reusable/Button";
import { Pressable, Text, View, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PasswordReset = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  // API Endpoint for requesting a password reset
  const requestPasswordResetUrl = "https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/request-password-reset";

  // Function to handle password reset request
  const handleRequestReset = async () => {
    try {
      const response = await axios.post(requestPasswordResetUrl, { email });

      if (response.status === 200) {
        Alert.alert("Success", "A password reset link has been sent to your email.");
        router.push("/Auth/passwordReset/OTP"); // Redirect to OTP page
      }
      await AsyncStorage.setItem('passwordEmailReset', email);
    } catch (error) {
      console.error("Error requesting password reset:", error);
      Alert.alert("Error", "Failed to send reset link. Please check your email.");
    }
  };

  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
      <View
        style={tailwind`flex flex-row items-center w-full justify-between px-3 py-6 h-[13%] absolute top-0 bg-[#0F1219] z-10`}
      >
        <Pressable onPress={() => router.back()}>
          <IonIcons name="arrow-back" size={25} color="white" />
        </Pressable>

        <Text style={tailwind`ml-[-25px] font-semibold text-[22px] text-white`}>
          Reset
        </Text>

        <Text></Text>
      </View>

      <View style={tailwind`w-full mt-[20%] mb-2 px-3`}>
        <Text style={tailwind`text-white font-normal text-[16px] mt-2 mb-4`}>
          Enter your email address and we’ll send you a password reset link
        </Text>
      </View>

      <DefaultInput
        label="Email Address"
        placeholder="Email/phone number"
        customCss="w-[95%] mx-auto"
        onChangeText={setEmail}  // Update email state on input change
        value={email}
      />

      <View style={tailwind`mt-8 w-[95%] mx-auto`}>
        <DefaultButton
          onPress={handleRequestReset}  // Call function to request reset
          text="Reset"
        />
      </View>
    </View>
  );
};

export default PasswordReset;
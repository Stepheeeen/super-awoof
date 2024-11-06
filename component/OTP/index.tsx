import { DefaultButton } from "@/component/reusable/Button";
import { useRouter } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
  TextInput, View, Text, Alert, TouchableOpacity, ScrollView,
} from "react-native";
import tailwind from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTPInput = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [email, setEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  const router = useRouter();

  const refs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("passwordEmailReset");
      if (storedEmail) {
        setEmail(storedEmail);
      }
      console.log('storedEmail', storedEmail)
    };

    fetchEmail();
  }, []);

  const handleChangeText = (text: string, index: number) => {
    if (text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < otp.length - 1) {
        refs[index + 1].current?.focus();
      }
    }
  };

  const verifyOtpApiUrl =
    "https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/verify";

  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join(""); // Join the OTP array into a string

    if (enteredOtp.length !== 4) {
      Alert.alert("Error", "Please enter the complete 4-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(verifyOtpApiUrl, { otp: enteredOtp });

      // Save the OTP as a string in AsyncStorage
      await AsyncStorage.setItem("passwordResetOTP", enteredOtp);

      Alert.alert("Success", "OTP verified successfully!");
      router.push("/Auth/forgotPassword/setPassword");
    } catch (error: any) {
      console.error("Error verifying OTP:", error.response?.data);
      Alert.alert("Error", error.response?.data.message || "OTP verification failed.");
    }
  };

  const resendOtpApiUrl =
    "https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/send-otp";

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const response = await axios.post(resendOtpApiUrl, { email });
      Alert.alert("Success", "OTP has been resent to your number!");
    } catch (error: any) {
      Alert.alert("Error", "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>

        <View style={tailwind`flex-row justify-around mt-3`}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={tailwind`w-16 h-16 bg-gray-800 text-white text-center text-xl rounded-lg border border-gray-600`}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              keyboardType="numeric"
              maxLength={1}
              ref={refs[index]}
            />
          ))}
        </View>

        <View style={tailwind`mt-5 w-full flex items-center`}>
          <TouchableOpacity onPress={handleResendOTP} disabled={isResending}>
            <Text style={tailwind`text-[#FFFF45] text-center`}>
              {isResending ? "Resending..." : "Resend OTP"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tailwind`mt-[25%] w-[95%] mx-auto`}>
          <DefaultButton onPress={handleVerifyOTP} text="Verify OTP" />
        </View>
    </View>
  );
};

export default OTPInput;
import { DefaultButton } from "@/component/reusable/Button";
import { useRouter } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Animated,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import tailwind from "twrnc";
import axios from "axios";
import Toast from "react-native-toast-message";
import ToastComponent from "@/component/reusable/ToastComponent";

const { width } = Dimensions.get("screen");

const OTPInput = ({ duration = 15000 }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]); // State to hold OTP digits
  const [isResending, setIsResending] = useState(false); // State to handle resend OTP button

  // Create an array of refs for each input
  const refs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const router = useRouter();
  const animatedValue = useRef(new Animated.Value(0)).current;

  // API endpoints
  const verifyOtpApiUrl =
    "https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/verify";
  const resendOtpApiUrl =
    "https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/send-otp";

  useEffect(() => {
    const startScrolling = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: -width,
        duration: duration,
        useNativeDriver: true,
      }).start(() => startScrolling());
    };

    startScrolling();
  }, [animatedValue, duration]);

  // Handle text change in OTP input
  const handleChangeText = (text: string, index: number) => {
    if (text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Focus the next input automatically
      if (text && index < otp.length - 1) {
        refs[index + 1].current?.focus();
      }
    }
  };

  // Handle key press events
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  // Show toast notifications
  const showToast = (message: string, type: "success" | "error") => {
    Toast.show({
      type: type,
      text1: message,
    });
  };

  // Verify OTP function
  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      showToast("Please enter the complete 4-digit OTP.", "error");
      return;
    }

    try {
      const response = await axios.post(verifyOtpApiUrl, { otp: enteredOtp });
      showToast("OTP verified successfully!", "success");
      setTimeout(() => {
        router.push("/Pages"); // Redirect after successful verification
      }, 1500);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "OTP verification failed. Please try again.";
      showToast(errorMessage, "error");
    }
  };

  // Resend OTP function
  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const response = await axios.post(resendOtpApiUrl);
      showToast("OTP has been resent to your number!", "success");
    } catch (error) {
      showToast("Failed to resend OTP. Please try again.", "error");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <View
      style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5 overflow-scroll`}
    >
      <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tailwind`w-full mt-[5%] mb-4 px-3`}>
          <Text style={tailwind`text-white font-bold text-[27px]`}>
            Email Verification Code
          </Text>
          <Text style={tailwind`text-white font-normal text-[18px] mt-2`}>
            Check your email for your 4-digit OTP.
          </Text>
        </View>

        {/* OTP Input Fields */}
        <View style={tailwind`flex-row justify-around items-center mt-3`}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={tailwind`w-16 h-16 bg-gray-800 text-white text-center text-xl rounded-lg border border-gray-600`}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              keyboardType="numeric"
              maxLength={1}
              ref={refs[index]}
              onKeyPress={(e) => handleKeyPress(e, index)}
              secureTextEntry
            />
          ))}
        </View>

        {/* Resend OTP Button */}
        <View style={tailwind`mt-5 w-full flex items-center`}>
          <TouchableOpacity onPress={handleResendOTP} disabled={isResending}>
            <Text style={tailwind`text-[#FFFF45] text-center`}>
              {isResending ? "Resending..." : "Resend OTP"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Verify Button */}
        <View style={tailwind`mt-[25%] w-[95%] mx-auto`}>
          <DefaultButton onPress={handleVerifyOTP} text="Verify OTP" />
        </View>
      </ScrollView>
      <ToastComponent />
    </View>
  );
};

export default OTPInput;

import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput, PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import tailwind from "twrnc";
import axios from "axios";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "@/app/constants";
import ToastComponent from "@/component/reusable/ToastComponent";
import Toast from "react-native-toast-message";

const Index = () => {
  const router = useRouter();
  const apiUrl = baseUrl;

  // Form data state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Save data to AsyncStorage
  const saveDataToLocalStorage = async () => {
    try {
      await AsyncStorage.setItem("userFullName", fullName);
      await AsyncStorage.setItem("userEmail", email);
    } catch (error) {
      showToast("Error saving data", "error");
    }
  };

  // Show toast notifications
  const showToast = (message: string, type: "success" | "error") => {
    Toast.show({
      type: type,
      text1: message,
    });
  };

  // Handle form submission
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/account/register`, {
        fullname: fullName,
        email: email,
        password: password,
      });
      console.log(response);

      showToast(
        response.data.msg || "Account created successfully!",
        "success"
      );
      // await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      // await AsyncStorage.setItem("accessToken", response.data.accessToken);

      // saveDataToLocalStorage();
      setTimeout(() => {
        router.push("/Auth/signup/OTP/"); // Redirect after successful registration
      }, 1500);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  return (
    <>
      <View
        style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5 overflow-scroll`}
      >
        <ScrollView
          style={tailwind`flex-1`}
          showsVerticalScrollIndicator={false}
        >
          <View style={tailwind`w-full mt-[5%] mb-4 px-3`}>
            <Text style={tailwind`text-white font-bold text-[27px]`}>
              Let’s Get Started
            </Text>
            <Text
              style={tailwind`text-white font-normal text-[18px] mt-2 mb-4`}
            >
              Create An Account To Get Started.
            </Text>
          </View>

          {/* Full Name Input */}
          <DefaultInput
            customInput={""}
            label="Full Name"
            placeholder="John Doe"
            customCss="w-[95%] mx-auto"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Email Address Input */}
          <DefaultInput
            customInput={""}
            label="Email Address"
            placeholder="johndoe@gmail.com"
            customCss="w-[95%] mx-auto mt-5"
            value={email}
            onChangeText={setEmail}
          />

          <Pressable onPress={() => router.push("/Auth/signup/phone-number/")}>
            <Text
              style={tailwind`text-[#00A859] ml-3 mt-1 text-[14px] font-normal`}
            >
              Use Phone Number Instead
            </Text>
          </Pressable>

          {/* Password Input */}
          <PasswordInput
            hidden="hidden"
            onPress={() => {}}
            placeholder="********"
            label="Create Password"
            customCss="mt-3 w-[95%] mx-auto"
            value={password}
            onChangeText={setPassword}
          />

          {/* Confirm Password Input */}
          <PasswordInput
            hidden="hidden"
            onPress={() => {}}
            placeholder="********"
            label="Confirm Password"
            customCss="mt-3 w-[95%] mx-auto"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <View style={tailwind`mt-10 w-[95%] mx-auto`}>
            {/* Register Button */}
            <DefaultButton onPress={handleRegister} text="Register" />
          </View>

          <View
            style={tailwind`flex flex-row w-full items-center justify-center mt-3`}
          >
            <Text style={tailwind`text-white`}>Have an account already?</Text>
            <Pressable onPress={() => router.push("/Auth/signin/email/")}>
              <Text style={tailwind`text-[#00A859] ml-2`}>Sign in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
      <ToastComponent />
    </>
  );
};

export default Index;

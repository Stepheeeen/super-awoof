import { useState } from "react";
import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput, PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import axios from "axios";
import tailwind from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "@/app/constants";
import Toast from "react-native-toast-message";
import ToastComponent from "@/component/reusable/ToastComponent";

const Index = () => {
  const router = useRouter();

  // Form data state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login form submission
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/account/login`, {
        email,
        password,
      });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login Successful",
      });

      const accountData = {
        ...response?.data?.account,
        coins: response?.data?.coins,
        paymentMethod: response?.data?.paymentMethod,
        mno: response?.data?.mno,
      };

      await AsyncStorage.setItem("user", JSON.stringify(accountData));
      await AsyncStorage.setItem("refreshToken", response?.data?.refreshToken);
      await AsyncStorage.setItem("accessToken", response?.data?.accessToken);

      // Redirect to the dashboard or other authenticated route
      router.push("/Pages/");
    } catch (error: any) {
      if (error.response) {
        if (error.response.data.message === "Please verify your account in order to login") {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.response.data.message,
          });
          router.push("/Auth/OTP/");
        } else if (error.response.status === 404) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.response.data.message,
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.response.data.message || "An error occurred. Please try again.",
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "An error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <>
      <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
        <View style={tailwind`w-full mt-[7%] mb-6 px-3`}>
          <Text style={tailwind`text-white font-bold text-[27px]`}>
            Hello, Welcome Back!
          </Text>
          <Text style={tailwind`text-white font-normal text-[18px] mt-2`}>
            Login To Your Account.
          </Text>
        </View>

        {/* Email Input */}
        <DefaultInput
        customInput={""}
          label="Email Address"
          placeholder="johndoe@gmail.com"
          customCss="w-[95%] mx-auto"
          value={email}
          onChangeText={setEmail} // Update email state
        />

        <Pressable onPress={() => router.push("/Auth/signin/phone-number/")}>
          <Text style={tailwind`text-[#00A859] ml-3 mt-2 text-[14px] font-normal`}>
            Use Phone Number Instead
          </Text>
        </Pressable>

        {/* Password Input */}
        <PasswordInput
          placeholder="********"
          label="Password"
          customCss="mt-5 w-[95%] mx-auto"
          hidden=""
          value={password}
          onChangeText={setPassword} // Update password state
          onPress={() => router.push("/Auth/forgotPassword/")}
        />

        <View style={tailwind`mt-8 w-[95%] mx-auto`}>
          {/* Login Button */}
          <DefaultButton onPress={handleLogin} text="Login" />
        </View>

        <View style={tailwind`flex flex-row w-full items-center justify-center mt-3`}>
          <Text style={tailwind`text-white`}>Don’t have an account?</Text>
          <Pressable onPress={() => router.push("/Auth/signup/email/")}>
            <Text style={tailwind`text-[#00A859] ml-2`}>Sign up</Text>
          </Pressable>
        </View>
      </View>

      <ToastComponent />
    </>
  );
};

export default Index;

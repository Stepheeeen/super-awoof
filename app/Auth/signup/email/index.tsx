import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput, PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View, Alert } from "react-native";
import tailwind from "twrnc";
import axios from "axios";
import { useState } from "react"; // Import useState for form handling
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "@/app/constants";

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
      console.log("Error saving data", error);
    }
  };

  // Handle form submission
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}account/register`, {
        fullname: fullName, // Use 'fullname' key as required by the backend
        email,
        password,
      });
      console.log(response.data); // Handle successful response
      alert(response.data.message || "Account created successfully!");
      await AsyncStorage.setItem('LoginMode', response?.data?.loginMode);
      router.push("/Auth/signup/email/OTP"); // Redirect to sign in page after successful registration
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error(error.response.data); // Log error data for debugging
        alert(
          error.response.data.message ||
            "Registration failed! Please try again."
        );
      } else if (error.request) {
        // Request was made but no response was received
        console.error(error.request);
        alert(
          "Error, No response from server. Please check your network and try again."
        );
      } else {
        // Something happened while setting up the request
        console.error("Error", error.message);
        alert(`"Error", ${error.message}`);
      }
    }
  };

  return (
    <View
      style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5 overflow-scroll`}
    >
      <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tailwind`w-full mt-[5%] mb-4 px-3`}>
          <Text style={tailwind`text-white font-bold text-[27px]`}>
            Let’s Get Started
          </Text>
          <Text style={tailwind`text-white font-normal text-[18px] mt-2 mb-4`}>
            Create An Account To Get Started.
          </Text>
        </View>

        {/* Full Name Input */}
        <DefaultInput
          label="Full Name"
          placeholder="Adebayo Haliah"
          customCss="w-[95%] mx-auto"
          value={fullName}
          onChangeText={setFullName} // Update state on text input
        />

        {/* Email Address Input */}
        <DefaultInput
          label="Email Address"
          placeholder="adebayohaliah@gmail.com"
          customCss="w-[95%] mx-auto mt-5"
          value={email}
          onChangeText={setEmail} // Update state on text input
        />

        <Pressable
          onPress={() => {
            router.push("/Auth/signup/phone-number");
          }}
        >
          <Text
            style={tailwind`text-[#00A859] ml-3 mt-1 text-[14px] font-normal`}
          >
            Use Phone Number Instead
          </Text>
        </Pressable>

        {/* Password Input */}
        <PasswordInput
          placeholder="********"
          label="Create Password"
          customCss="mt-3 w-[95%] mx-auto"
          hidden="opacity-0"
          value={password}
          onPress={() => {
            router.push("/Auth/signin/email");
          }}
          onChangeText={setPassword} // Update state on password input
        />

        {/* Confirm Password Input */}
        <PasswordInput
          onPress={() => {
            router.push("/Auth/signin/email");
          }}
          placeholder="********"
          label="Confirm Password"
          customCss="mt-3 w-[95%] mx-auto"
          hidden="opacity-0"
          value={confirmPassword}
          onChangeText={setConfirmPassword} // Update state on confirm password input
        />

        <View style={tailwind`mt-10 w-[95%] mx-auto`}>
          {/* Register Button */}
          <DefaultButton onPress={handleRegister} text="Register" />
        </View>

        <View
          style={tailwind`flex flex-row w-full items-center justify-center mt-3`}
        >
          <Text style={tailwind`text-white`}>Have an account already?</Text>
          <Pressable
            onPress={() => {
              router.push("/Auth/signin/email");
            }}
          >
            <Text style={tailwind`text-[#00A859] ml-2`}>Sign in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;





// bearer token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjYwMDM3MjksInN1YiI6IjY2ZGVlNDAzZjJlMmQxMjA2YjI4ZjNkYyIsImlhdCI6MTcyNTg4MzcyOX0._V_HGzQp_J0wU8gtLQctknAgMcfbfxypSTQNFVATP2k
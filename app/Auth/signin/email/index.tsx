import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput, PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Pressable, Text, View, Alert } from "react-native";
import axios from 'axios';
import tailwind from "twrnc";
import { useState } from "react"; // Import useState for handling form data

const Index = () => {
  const router = useRouter();
  const apiUrl = 'https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/';

  // Form data state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login form submission
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}account/login`, {
        email,
        password,
      });

      console.log(response.data); // Handle successful response
      alert(`Success", ${response.data.message}`);

      // Redirect to the dashboard or other authenticated route
      router.push('/Pages'); 

    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error(error.response.data); // Log error data for debugging
        alert(error.response.data.message);
      } else if (error.request) {
        // Request was made but no response was received
        console.error(error.request);
        alert("Error, No response from server. Please check your network and try again.");
      } else {
        // Something happened while setting up the request
        console.error('Error', error.message);
        alert(`"Error", ${error.message}`);
      }
    }
  };

  return (
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
        label="Email Address"
        placeholder="adebayohaliah@gmail.com"
        customCss="w-[95%] mx-auto"
        value={email}
        onChangeText={setEmail} // Update email state
      />

      <Pressable
        onPress={() => {
          router.push("/Auth/signin/phone-number");
        }}
      >
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
        onPress={() => {
          router.push("/Auth/forgotPassword");
        }}
      />

      <View style={tailwind`mt-8 w-[95%] mx-auto`}>
        {/* Login Button */}
        <DefaultButton onPress={handleLogin} text="Login" />
      </View>

      <View style={tailwind`flex flex-row w-full items-center justify-center mt-3`}>
        <Text style={tailwind`text-white`}>Don’t have an account?</Text>
        <Pressable
          onPress={() => {
            router.push("/Auth/signup/email");
          }}
        >
          <Text style={tailwind`text-[#00A859] ml-2`}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Index;
import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import tailwind from "twrnc";
import axios from 'axios';
import { useState } from 'react';

const Index = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = async () => {
    try {
      // Make the API call to fund the wallet
      const response = await axios.post('https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/login', {
        phoneNumber, // Include the phone number in the request body
      });

      // Handle successful response
      console.log('Funding successful:', response.data);
      // Navigate to the next screen or show success message
      router.push('/Pages');
    } catch (error) {
      // Handle error response
      console.error('Funding failed:', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
      <View style={tailwind`w-full my-2 mb-6 px-3`}>
        <Text style={tailwind`text-white font-bold text-[27px]`}>Hello, Welcome Back!</Text>
        <Text style={tailwind`text-white font-normal text-[18px] mt-2 mb-4`}>Login To Your Account.</Text>
      </View>

      <DefaultInput
        label="Phone Number"
        placeholder="09120397347"
        customCss="w-[95%] mx-auto"
        value={phoneNumber}
        onChangeText={setPhoneNumber} // Update phoneNumber state
      />

      <Pressable onPress={() => { router.push('/Auth/signin/email') }}>
        <Text style={tailwind`text-[#00A859] ml-3 mt-2 text-[14px] font-normal`}>
          Use Email Address Instead
        </Text>
      </Pressable>

      <View style={tailwind`mt-10 w-[95%] mx-auto`}>
        <DefaultButton onPress={handleLogin} text="Login" />
      </View>

      <View style={tailwind`flex flex-row w-full items-center justify-center mt-3`}>
        <Text style={tailwind`text-white`}>Don’t have an account?</Text>
        <Pressable onPress={() => { router.push('/Auth/signup/phone-number') }}>
          <Text style={tailwind`text-[#00A859] ml-2`}>
            Sign up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Index;
import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput } from "@/component/reusable/Input";
import { Redirect, useRouter } from "expo-router";
import { Alert } from 'react-native';
import { useState } from "react";
import { Pressable, Text, View, ActivityIndicator, Linking } from "react-native";
import tailwind from "twrnc";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { DisabledButton } from "@/component/reusable/DisabledButton";
import { Paystack } from "react-native-paystack-webview";
import axios from "axios";
import { baseUrl } from "@/app/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const [coin, setCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isCoinValid, setIsCoinValid] = useState(true);
  const [showPaystack, setShowPaystack] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCoinChange = (value: string) => {
    setCoin(value);
    const nairaAmount = Number(value) * 25;
    setAmount(nairaAmount.toString());
    setIsCoinValid(Number(value) >= 1);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const coinValue = Number(value) / 25;
    setCoin(coinValue.toString());
    setIsAmountValid(Number(value) >= 25);
  };

  const handlePaystackPayment = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log(token);
  
    if (isAmountValid && isCoinValid) {
      setLoading(true); // Show loading indicator
      setShowPaystack(true);
  
      try {
        // Send request to get the Paystack authorization URL
        const response = await axios.post(
          `${baseUrl}/wallet/fund`,
          { amount },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Open the Paystack payment URL in the browser
        const authorizationUrl = response.data.authorization_url;
        const key = response.data.reference; // Reference for verification
        console.log(`Payment reference: ${key}`);
  
        // Check if the URL can be opened
        const supported = await Linking.canOpenURL(authorizationUrl);
  
        if (supported) {
          // Open the URL in the device's browser
          await Linking.openURL(authorizationUrl);
  
          // Payment window is open now. 
          // Wait for a confirmation that the user has completed the payment process.
          // This could be triggered by the user coming back to the app.
  
          // After the payment is completed, verify the payment using the reference.
          verifyPayment(key, token);
  
        } else {
          console.error(`Cannot open this URL: ${authorizationUrl}`);
        }
  
      } catch (error) {
        console.error(error); // Log the error if something goes wrong
      } finally {
        setLoading(false); // Hide loading indicator
      }
    }
  };
  
  // Function to verify the payment
  const verifyPayment = async (reference: any, token: any) => {
    try {
      const verifyResponse = await axios.get(`${baseUrl}/wallet/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (verifyResponse.data.status === 'success') {
        // Payment is verified
        Alert.alert('Payment Verified', 'Your payment has been successfully verified!');
        console.log('Payment verification successful', verifyResponse.data);
      } else {
        // Handle failed or pending payment status
        Alert.alert('Payment Failed', 'Payment verification failed or incomplete.');
        console.error('Payment verification failed or incomplete', verifyResponse.data);
      }
  
    } catch (error) {
      console.error('Error during payment verification', error);
      Alert.alert('Verification Error', 'An error occurred while verifying your payment.');
    }
  };

  return (
    <>
      <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
        <View style={tailwind`w-full mt-[5%] mb-[4%] px-3`}>
          <Text style={tailwind`text-white font-bold text-[27px] text-center`}>
            Deposit
          </Text>
        </View>

        <DefaultInput
          customInput={!isCoinValid ? "border-red-500" : ""}
          label="Coin"
          placeholder="1"
          customCss="w-[95%] mx-auto"
          value={coin}
          onChangeText={handleCoinChange}
        />

        <View
          style={tailwind`w-full flex flex-row justify-center items-center mt-5`}
        >
          <View
            style={tailwind`w-auto flex flex-row justify-center items-center gap-2`}
          >
            <FontAwesome6 name="arrow-down" size={24} color="white" />
            <FontAwesome6 name="arrow-up" size={24} color="white" />
          </View>
        </View>

        <DefaultInput
          customInput={!isAmountValid ? "border-red-500" : ""}
          label="Amount (Naira)"
          placeholder="25"
          customCss={`w-[95%] mx-auto mt-5`}
          value={amount}
          onChangeText={handleAmountChange}
        />

        <View style={tailwind`mt-10 w-[95%] mx-auto`}>
          {!(isAmountValid && isCoinValid) ? (
            <DisabledButton text="Continue" />
          ) : (
            <DefaultButton onPress={handlePaystackPayment} text="Continue" />
          )}

          <Pressable onPress={() => router.back()}>
            <Text
              style={tailwind`text-[#00A859] ml-2 mx-auto mt-3 text-[18px] underline`}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
        <Text>
          {loading && <ActivityIndicator size="large" color="green" />}{" "}
          {/* Show loading indicator */}
        </Text>
      </View>
    </>
  );
};

export default Index;

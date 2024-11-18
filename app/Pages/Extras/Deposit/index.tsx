import React, { useEffect, useState } from "react";
import {
  Alert,
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";
import { baseUrl, showToast } from "@/app/constants";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tailwind from "twrnc";
import { DisabledButton } from "@/component/reusable/DisabledButton";

const Index = () => {
  const router = useRouter();

  // State variables
  const [coin, setCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isCoinValid, setIsCoinValid] = useState(true);
  const [showPaystack, setShowPaystack] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Fetch token from AsyncStorage on component mount
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("accessToken");
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  const verifyPayment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/wallet/verify/${reference}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showToast("Payment Successful", "success");
    } catch (error: any) {
      //  console.log(error.response.data)
      showToast("Payment was abandoned or not completed", "error");
    } finally {
      setLoading(false);
    }
  };

  const calculateAmount = (coinValue: string) =>
    (Number(coinValue) * 25).toString();
  const calculateCoin = (amountValue: string) =>
    (Number(amountValue) / 25).toString();

  const handleCoinChange = (value: string) => {
    setCoin(value);
    setAmount(calculateAmount(value));
    setIsCoinValid(Number(value) >= 1);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setCoin(calculateCoin(value));
    setIsAmountValid(Number(value) >= 25);
  };

  const handlePaystackPayment = async () => {
    if (isAmountValid && isCoinValid && token) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${baseUrl}/wallet/fund`,
          { amount },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPaymentUrl(response.data.authorization_url);
        setReference(response.data.reference);
        setShowPaystack(true);
      } catch (error: any) {
        console.error("Payment initiation error:", error.response.data);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleWebViewClose = () => {
    setShowPaystack(false);
    setPaymentUrl(null);
    verifyPayment();
  };

  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
      {/* Header */}
      <View style={tailwind`w-full mt-[5%] mb-[4%] px-3`}>
        <Text style={tailwind`text-white font-bold text-[27px] text-center`}>
          Deposit
        </Text>
      </View>

      {/* Coin Input */}
      <DefaultInput
        customInput={!isCoinValid ? "border-red-500" : ""}
        label="Coin"
        placeholder="1"
        customCss="w-[95%] mx-auto"
        value={coin}
        onChangeText={handleCoinChange}
      />

      {/* Coin/Amount Converter Icons */}
      <View
        style={tailwind`w-full flex flex-row justify-center items-center mt-5`}
      >
        <FontAwesome6 name="arrow-down" size={24} color="white" />
        <FontAwesome6 name="arrow-up" size={24} color="white" />
      </View>

      {/* Amount Input */}
      <DefaultInput
        customInput={!isAmountValid ? "border-red-500" : ""}
        label="Amount (Naira)"
        placeholder="25"
        customCss="w-[95%] mx-auto mt-5"
        value={amount}
        onChangeText={handleAmountChange}
      />

      {/* Continue Button */}
      <View style={tailwind`mt-10 w-[95%] mx-auto`}>
        {isAmountValid && isCoinValid && amount && coin ? (
          <DefaultButton onPress={handlePaystackPayment} text="Continue" />
        ) : (
          <DisabledButton text="Continue" />
        )}

        {/* Cancel Button */}
        <Pressable onPress={() => router.push("/Pages/")}>
          <Text
            style={tailwind`text-[#00A859] mx-auto mt-3 text-[18px] underline`}
          >
            Cancel
          </Text>
        </Pressable>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator size="large" color="green" style={tailwind`mt-5`} />
      )}

      {/* Paystack WebView Modal */}
      {showPaystack && paymentUrl && (
        <Modal visible={showPaystack} animationType="slide">
          <WebView
            style={tailwind`mt-[18%]`}
            source={{ uri: paymentUrl }}
            onNavigationStateChange={(navState) => {
              if (navState.url.includes("payment successful")) {
                handleWebViewClose();
                Alert.alert(
                  "Payment Verified",
                  "Your payment has been successfully verified!"
                );
              }
            }}
          />
          <Pressable
            style={tailwind`absolute top-10 right-10`}
            onPress={handleWebViewClose}
          >
            <MaterialIcons name="cancel" size={30} color="red" />
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

export default Index;

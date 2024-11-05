import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View, ActivityIndicator, Modal } from "react-native";
import tailwind from "twrnc";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { DisabledButton } from "@/component/reusable/DisabledButton";
import axios from "axios";
import { baseUrl } from "@/app/constants";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const [coin, setCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isCoinValid, setIsCoinValid] = useState(true);
  const [showPaystack, setShowPaystack] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
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
    if (isAmountValid && isCoinValid) {
      setLoading(true); // Show loading indicator
      
      try {
        const token = await AsyncStorage.getItem("accessToken");
        // console.log(token)

        // Send request to get the Paystack authorization URL
        const response = await axios.post(`${baseUrl}/wallet/fund`, {
          amount,
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        response.data;
        console.log(response.data);

        // Open the Paystack payment URL inside WebView
        // const authorizationUrl = response.data.authorization_url;
        // setPaymentUrl(authorizationUrl); // Set the payment URL for the WebView
        // setShowPaystack(true); // Show the WebView
      } catch (error: any) {
        console.error(error.response.data);
        // console.error(
        //   "Payment initiation error:",
        //   error.response?.data?.message || error.message
        // );
        // Alert.alert(
        //   "Error",
        //   "An error occurred while processing your payment."
        // );
      } finally {
        setLoading(false); // Hide loading indicator
      }
    }
  };

  const handleWebViewClose = () => {
    setShowPaystack(false);
    setPaymentUrl(null);
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

          <Pressable onPress={() => router.push("/Pages/")}>
            <Text
              style={tailwind`text-[#00A859] ml-2 mx-auto mt-3 text-[18px] underline`}
            >
              Cancel
            </Text>
          </Pressable>
        </View>

        <Text>
          {loading && <ActivityIndicator size="large" color="green" />}{" "}
        </Text>
        {/* Show loading indicator */}

        {showPaystack && paymentUrl && (
          <Modal
            visible={showPaystack}
            animationType="slide"
            style={tailwind`pt-7`}
          >
            <WebView
              style={tailwind`mt-[18%]`}
              source={{ uri: paymentUrl }}
              onNavigationStateChange={(navState: any) => {
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
    </>
  );
};

export default Index;

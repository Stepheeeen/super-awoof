import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import {
  Alert,
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { DisabledButton } from "@/component/reusable/DisabledButton";
import axios from "axios";
import { baseUrl } from "@/app/constants";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tailwind from "twrnc";
import ToastComponent from "@/component/reusable/ToastComponent";
import Toast from "react-native-toast-message";

const Index = () => {
  const [coin, setCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isCoinValid, setIsCoinValid] = useState(true);
  const [showPaystack, setShowPaystack] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Fetch token once on component mount
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("accessToken");
      setToken(storedToken);
    };
    fetchToken();
  }, [token]);

  const verifyPayment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/wallet/verify/${reference}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Toast.show({
        type: "success",
        text1: "Payment Successful.",
        // text2: "Payment Successful.",
      });
      // Alert.alert("Payment successfull", response.data.message);
      // if (response.data.status === "200") {
      // } else {
      //   Alert.alert("Payment verification error:", response.data.message);
      // }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Payment failed",
        text2: error.response.data.msg,
      });
      // Alert.alert("Payment verification error:", error.response.data.message);
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
      } catch (error) {
        console.error("Payment initiation error:", error);
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
          <FontAwesome6 name="arrow-down" size={24} color="white" />
          <FontAwesome6 name="arrow-up" size={24} color="white" />
        </View>

        <DefaultInput
          customInput={!isAmountValid ? "border-red-500" : ""}
          label="Amount (Naira)"
          placeholder="25"
          customCss="w-[95%] mx-auto mt-5"
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
              style={tailwind`text-[#00A859] mx-auto mt-3 text-[18px] underline`}
            >
              Cancel
            </Text>
          </Pressable>
        </View>

        {loading && (
          <ActivityIndicator
            size="large"
            color="green"
            style={tailwind`mt-5`}
          />
        )}

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
      {/* <ToastComponent /> */}
    </>
  );
};

export default Index;

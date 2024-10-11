import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import tailwind from "twrnc";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { DisabledButton } from "@/component/reusable/DisabledButton";
import axios from "axios";
import { baseUrl } from "@/app/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const [coin, setCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isCoinValid, setIsCoinValid] = useState(true);
  const router = useRouter();

  const handleCoinChange = (value: string) => {
    setCoin(value);
    const nairaAmount = Number(value) * 25;
    setAmount(nairaAmount.toString());

    // Validate the coin
    setIsCoinValid(Number(value) >= 1);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const coinValue = Number(value) / 25;
    setCoin(coinValue.toString());

    // Validate the amount
    setIsAmountValid(Number(value) >= 25);
  };

  const handlePaystackPayment = async () => {
    if (isAmountValid && isCoinValid) {
      try {
        const access = await AsyncStorage.getItem("accessToken");
        console.log(access);

        const response = await axios.post(
          `${baseUrl}/wallet/fund`,
          {
            amount,
          },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        console.log(response.data.message);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
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

      {/* Amount Input */}
      <DefaultInput
        customInput={!isAmountValid ? "border-red-500" : ""}
        label="Amount (Naira)"
        placeholder="25"
        customCss={`w-[95%] mx-auto mt-5`}
        value={amount}
        onChangeText={handleAmountChange}
      />

      <View style={tailwind`mt-10 w-[95%] mx-auto`}>
        {/* Continue Button */}
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
    </View>
  );
};

export default Index;

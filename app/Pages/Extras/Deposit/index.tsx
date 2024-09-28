import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput, PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import tailwind from "twrnc";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const index = () => {
  const [coin, setCoin] = useState();
  const [amount, setAmount] = useState();
  const router = useRouter();
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
      <View style={tailwind`w-full mt-[5%] mb-[4%] mb-6 px-3`}>
        <Text style={tailwind`text-white font-bold text-[27px] text-center`}>Deposit</Text>
      </View>

      {/* Email Input */}
      <DefaultInput
        label="Amount"
        placeholder="25"
        customCss="w-[95%] mx-auto"
        value={amount}
        onChangeText={setAmount} // Update Amount
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
        label="Coin"
        placeholder="1"
        customCss="w-[95%] mx-auto"
        value={coin}
        onChangeText={setCoin} // Update Coins
      />

      <View style={tailwind`mt-10 w-[95%] mx-auto`}>
        {/* Login Button */}
        <DefaultButton onPress={() => {}} text="Continue" />

        <Pressable
          onPress={() => {
            router.back();
          }}
        >
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

export default index;

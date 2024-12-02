import { WalletCard } from "@/component/reusable/Wallet";
import React from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import tailwind from "twrnc";
import { router } from "expo-router";

const index = () => {
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
      {/* Header */}
      <View style={tailwind`w-full mt-[5%] mb-[4%] px-3 flex flex-row items-center`}>
        <Pressable onPress={() => router.back()}>
          <EvilIcons name="arrow-left" size={28} color="white" />
        </Pressable>
        <Text style={tailwind`text-white font-bold text-[25px] text-center mx-auto`}>
          Wallet
        </Text>
      </View>

      <View style={tailwind`w-full px-1`}>
        <WalletCard />
      </View>
    </View>
  );
};

export default index;

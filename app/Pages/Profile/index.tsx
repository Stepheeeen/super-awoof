import { DefaultInput } from "@/component/reusable/Input";
import TabBar from "@/component/reusable/TabBar";
import { Image, Pressable, Text, View } from "react-native";
import tailwind from "twrnc";

const index = () => {
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full`}>
      <View
        style={tailwind`flex flex-row items-center w-full justify-between px-5 py-6 h-[13%] absolute top-0 bg-[#0F1219] z-10 `}
      >
        <Image
          source={require("../../../assets/images/favicon.png")}
          style={tailwind`w-[50px] h-[50px]`}
        />
        <Text style={tailwind`ml-[-15px] font-semibold text-[22px] text-white`}>Profile</Text>
        <Pressable
          style={tailwind`flex flex-row items-center py-[2px] px-2 rounded`}
        >
        </Pressable>
      </View>

      <View style={tailwind`mt-[20%] py-6 px-3`}>
        
      </View>

      <TabBar />
    </View>
  );
};

export default index;

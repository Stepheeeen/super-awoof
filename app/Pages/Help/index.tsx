import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput } from "@/component/reusable/Input";
import TabBar from "@/component/reusable/TabBar";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
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
        <Text style={tailwind`ml-[-15px] font-semibold text-[22px] text-white`}>Help</Text>
        <Pressable
          style={tailwind`flex flex-row items-center py-[2px] px-2 rounded`}
        >
          {/* <Image source={require('../../../assets/images/AwoofCoin.png')} style={tailwind``} />
          <Text style={tailwind`text-white text-[17px] mb-1 ml-1`}>
            6000
          </Text> */}
        </Pressable>
      </View>

      <ScrollView
        style={tailwind`flex-1`}
        showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator if needed
      >

      <View style={tailwind`mt-[20%] py-10 px-3 pb-[90px]`}>
        <View style={tailwind`w-full mb-4 px-3`}>
          <Text style={tailwind`text-white font-semibold text-[25px]`}>
            Hello, What can we help you with?
          </Text>
          <Text style={tailwind`text-white font-light text-[16px] mt-2 mb-4`}>
            Send a message across with your questions and we would be swift to
            respond to you.
          </Text>
        </View>

        <DefaultInput
          label="Email Address"
          placeholder="adebayohaliah@gmail.com"
          customCss="w-[95%] mx-auto"
        />

        <View style={tailwind`mt-6`}>
          <Text style={tailwind`text-white mb-2 ml-4 text-[17px] font-thin`}>
            Message
          </Text>
          <TextInput
            style={tailwind`border mx-auto border-[#34363B] rounded-lg p-3 bg-[#20232A] text-white w-[95%] text-[16px] font-normal`}
            multiline={true}
            numberOfLines={7} // Adjust as needed
            placeholder="Write message here..."
            placeholderTextColor="#9CA3AF" // Tailwind's text-gray-400
          />
        </View>

        <View style={tailwind`w-[95%] mx-auto mt-8`}>
          <DefaultButton onPress={() => {}} text="Submit" />
        </View>
      </View>
      </ScrollView>

      <TabBar />
    </View>
  );
};

export default index;

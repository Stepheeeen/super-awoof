import { DefaultInput } from "@/component/reusable/Input";
import TabBar from "@/component/reusable/TabBar";
import { Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import IonIcons from "@expo/vector-icons/Ionicons"
import tailwind from "twrnc";

const index = () => {
  const router = useRouter();
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full`}>
      <View
        style={tailwind`flex flex-row items-center w-full justify-between px-3 py-6 h-[13%] absolute top-0 bg-[#0F1219] z-10 `}
      >
        <Pressable
          onPress={() => {
            router.back;
          }}
        >
            <IonIcons name="arrow-back" size={25} color="white" />
        </Pressable>

        <Text style={tailwind`ml-[-25px] font-semibold text-[22px] text-white`}>
          View Profile
        </Text>

        <Text></Text>
      </View>

      <View style={tailwind`w-full mt-[20%] mb-2 px-3`}>
        <DefaultInput
          label="Full Name"
          placeholder="Adebayo Halah"
          customCss="w-[95%] mx-auto"
          onChangeText={() => {}}
          value={""}
        />

        <DefaultInput
          label="Email"
          placeholder="adebayohaliah@gmail.com"
          customCss="w-[95%] mx-auto"
          onChangeText={() => {}}
          value={""}
        />
      </View>

      <TabBar />
    </View>
  );
};

export default index;

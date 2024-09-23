import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput, PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons"
import tailwind from "twrnc";

const index = () => {
  const router = useRouter();
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
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
          label="Phone Number"
          placeholder="09120397347"
          customCss="w-[95%] mx-auto"
          onChangeText={() => {}}
          value={""}
        />
      </View>
    </View>
  );
};

export default index;

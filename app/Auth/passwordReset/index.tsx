import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput, PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { BsArrowLeft } from "react-icons/bs";
import tailwind from "twrnc";

const index = () => {
  const router = useRouter();
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
      <View
        style={tailwind`flex flex-row items-center w-full justify-between px-3 py-6 h-[13%] absolute top-0 bg-[#0F1219] z-10 `}
      >
        <Pressable onPress={()=>{router.back}}>
          <BsArrowLeft size={30} color="white" />
        </Pressable>

        <Text style={tailwind`ml-[-25px] font-semibold text-[22px] text-white`}>
          Reset
        </Text>

        <Text></Text>
      </View>

      <View style={tailwind`w-full mt-[20%] mb-2 px-3`}>
        <Text style={tailwind`text-white font-normal text-[16px] mt-2 mb-4`}>
          Enter your email address and we’ll send you a password reset link
        </Text>
      </View>

      <DefaultInput
        label="Email Address"
        placeholder="adebayohaliah@gmail.com"
        customCss="w-[95%] mx-auto"
      />

      <View style={tailwind`mt-8 w-[95%] mx-auto`}>
        <DefaultButton
          onPress={() => {
            router.push("/Auth/OTP");
          }}
          text="Reset"
        />
      </View>
    </View>
  );
};

export default index;

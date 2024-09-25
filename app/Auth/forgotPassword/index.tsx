import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput, PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native"
import tailwind from "twrnc"


const index = () => {
  const router = useRouter()
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
      <View style={tailwind`w-full mt-[10%] mb-6 px-3`}>
        <Text style={tailwind`text-white font-bold text-[27px]`}>Reset Your Password</Text>
        <Text style={tailwind`text-white font-normal text-[18px] mt-2 mb-4`}>Enter your email address and we’ll send you a password reset link</Text>
      </View>

      <DefaultInput onChangeText={() => {}} value={''} label="Email Address" placeholder="adebayohaliah@gmail.com" customCss="w-[95%] mx-auto" />

      <View style={tailwind`mt-10 w-[95%] mx-auto`}>
        <DefaultButton onPress={()=> {router.push('/Auth/OTP')} } text="Reset" />
      </View>

    </View>
  )
}

export default index

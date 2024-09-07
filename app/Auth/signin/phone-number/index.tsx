import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput, PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native"
import tailwind from "twrnc"


const index = () => {
  const router = useRouter()
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5`}>
      <View style={tailwind`w-full my-2 mb-6 px-3`}>
        <Text style={tailwind`text-white font-bold text-[27px]`}>Hello, Welcome Back!</Text>
        <Text style={tailwind`text-white font-normal text-[18px] mt-2 mb-4`}>Login To Your Account.</Text>
      </View>

      <DefaultInput label="Email Address" placeholder="adebayohaliah@gmail.com" customCss="w-[95%] mx-auto" />
      <Pressable onPress={() => { router.push('/Auth/signin/email') }}>
        <Text style={tailwind`text-[#00A859] ml-3 mt-2 text-[14px] font-normal`}>
          Use Email Address Instead
        </Text>

      </Pressable>
      <PasswordInput placeholder="********" label="Password" customCss="mt-5 w-[95%] mx-auto" />

      <View style={tailwind`mt-10 w-[95%] mx-auto`}>
        <DefaultButton onPress={''} text="Login" />
      </View>
      <View style={tailwind`flex flex-row w-full items-center justify-center mt-3`}>
        <Text style={tailwind`text-white`}>Don’t have an account?</Text>
        <Pressable onPress={()=>{router.push('/Auth/signup/phone-number')}}>
          <Text style={tailwind`text-[#00A859] ml-2`}>
            Sign up
          </Text>
        </Pressable>
      </View>

    </View>
  )
}

export default index

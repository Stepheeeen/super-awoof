import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput, PasswordInput } from "@/component/reusable/Input";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native"
import tailwind from "twrnc"


const index = () => {
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-3 py-5`}>

      <DefaultInput label="Email Address" placeholder="johndoe@gmail.com" customCss="" />
      <Pressable>
      Use Phone Number Instead
      </Pressable>
      <PasswordInput placeholder="********" label="Password" customCss="mt-5" />

      <View style={tailwind`mt-10`}>
        <DefaultButton onPress={''} text="Signin" />
      </View>
      <View style={tailwind`flex flex-row w-full items-center justify-center`}>
        <Text style={tailwind`text-white`}>don’t have an account?</Text>
        <Pressable>
          <Text style={tailwind`text-[#00A859]`}>
            Sign up
          </Text>
        </Pressable>
      </View>

    </View>
  )
}

export default index

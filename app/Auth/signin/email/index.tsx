import { PasswordInput } from "@/component/reusable/Input";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native"
import tailwind from "twrnc"


const index = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-3 py-5`}>
        <PasswordInput placeholder="Enter Password" label="Password"/>
    </View>
  )
}

export default index

import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import tailwind from "twrnc";


export const PasswordInput = ({placeholder, label}:{placeholder: string, label:string}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={tailwind``}>
        <Text style={tailwind`text-white mb-2 ml-1 text-[17px] font-normal`}>{label}</Text>
        <TextInput
        style={tailwind`border border-[#34363B] rounded-lg px-4 bg-[#20232A] text-white w-full h-[50px] text-[19px] font-[500]`}
        placeholder={placeholder}
        placeholderTextColor="gray"
        secureTextEntry={!isPasswordVisible} // Ensures the input is hidden
        />
        <Pressable onPress={togglePasswordVisibility} style={tailwind`w-full flex justify-end items-end`}>
          <Text style={tailwind`mr-2 text-[#00A859] text-[15px] mt-1 font-medium`}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </Text>
        </Pressable>
    </View>
  )
}



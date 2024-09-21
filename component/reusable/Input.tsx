import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import tailwind from "twrnc";


export const PasswordInput = ({ placeholder, label, customCss, onPress, hidden, value, onChangeText }: { placeholder: string, label: string, customCss: string, onPress: any, hidden: string, value: any, onChangeText: any, }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };
    return (
        <View style={tailwind`${customCss}`}>
            <Text style={tailwind`text-white mb-2 ml-1 text-[17px] font-thin`}>{label}</Text>
            <TextInput
                style={tailwind`border border-[#34363B] rounded-lg px-4 bg-[#20232A] text-white w-full h-[55px] text-[16px] font-normal`}
                placeholder={placeholder}
                placeholderTextColor="gray"
                secureTextEntry={!isPasswordVisible} // Ensures the input is hidden\
                value={value}
                onChangeText={onChangeText}
            />
            <View style={tailwind`w-full flex flex-row justify-between items-end`}>
                <Pressable onPress={onPress}>
                    <Text style={tailwind`ml-2 text-[#00A859] text-[15px] mt-1 font-normal ${hidden}`}>
                        Forgot password?
                    </Text>
                </Pressable>

                <Pressable onPress={togglePasswordVisibility} >
                    <Text style={tailwind`mr-2 text-[#00A859] text-[15px] mt-1 font-normal`}>
                        {isPasswordVisible ? 'Hide' : 'Show'}
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export const DefaultInput = ({ placeholder, label, customCss, value, onChangeText }: { placeholder: string, label: string, customCss: string, value: any, onChangeText: any, }) => {
    return (
        <View style={tailwind`${customCss}`}>
            <Text style={tailwind`text-white mb-2 ml-1 text-[17px] font-thin`}>{label}</Text>
            <TextInput
                style={tailwind`border border-[#34363B] rounded-lg px-4 bg-[#20232A] text-white w-full h-[55px] text-[16px] font-normal`}
                placeholder={placeholder}
                placeholderTextColor="gray"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}



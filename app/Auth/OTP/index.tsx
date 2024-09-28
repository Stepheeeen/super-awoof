import { DefaultButton } from '@/component/reusable/Button';
import { useRouter } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, NativeSyntheticEvent, TextInputKeyPressEventData, Animated, ScrollView, Dimensions, Text } from 'react-native';
import tailwind from 'twrnc';
import tw from 'twrnc';

const OTPInput = ({ duration = 15000 }) => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']); // State to hold OTP digits

    // Create an array of refs for each input
    const refs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

    const handleChangeText = (text: string, index: number) => {
        if (text.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);

            // Automatically focus the next input
            if (text && index < otp.length - 1) {
                refs[index + 1].current?.focus();
            }
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            refs[index - 1].current?.focus();
        }
    };

    const router = useRouter()


    return (
            <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5 overflow-scroll`}>
                <ScrollView
                    style={tailwind`flex-1`}
                    showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator if needed
                >

                    <View style={tailwind`w-full mt-[5%] mb-4 px-3`}>
                        <Text style={tailwind`text-white font-bold text-[27px]`}>OTP Verification</Text>
                        <Text style={tailwind`text-white font-normal text-[18px] mt-2 `}>Check kofo*******@gmail.com for your 4-digit OTP.</Text>
                    </View>

                    <View style={tw`flex-row justify-around items-center mt-3`}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                style={tw`w-16 h-16 bg-gray-800 text-white text-center text-xl rounded-lg border border-gray-600`}
                                value={digit}
                                onChangeText={(text) => handleChangeText(text, index)}
                                keyboardType="numeric"
                                maxLength={1}
                                ref={refs[index]}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                secureTextEntry={true}
                            />
                        ))}
                    </View>

                    <View style={tailwind`mt-[25%] w-[95%] mx-auto`}>
                        <DefaultButton onPress={() => {router.push('/')}} text="Continue" />
                    </View>

                </ScrollView>

            </View>
    );
};

export default OTPInput;
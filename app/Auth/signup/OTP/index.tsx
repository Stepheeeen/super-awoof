import { DefaultButton } from '@/component/reusable/Button';
import { useRouter } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, NativeSyntheticEvent, TextInputKeyPressEventData, Animated, ScrollView, Dimensions, Text, Alert, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';
import tw from 'twrnc';
import axios from 'axios';

const { width } = Dimensions.get('screen');

const OTPInput = ({ duration = 15000 }) => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']); // State to hold OTP digits
    const [isResending, setIsResending] = useState(false); // State to handle resend OTP button

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

    const router = useRouter();
    const animatedValue = useRef(new Animated.Value(0)).current;

    // API endpoint for verifying OTP
    const verifyOtpApiUrl = 'https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/verify';
    const resendOtpApiUrl = 'https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/send-otp';

    useEffect(() => {
        const startScrolling = () => {
            // Reset the position to the starting point
            animatedValue.setValue(0);
            // Animate the scrolling
            Animated.timing(animatedValue, {
                toValue: -width, // Move the text outside the screen to the left
                duration: duration, // Duration of the scroll
                useNativeDriver: true,
            }).start(() => startScrolling()); // Loop the animation
        };

        startScrolling();
    }, [animatedValue, duration]);

    // Animated style for moving the text
    const animatedStyle = {
        transform: [{ translateX: animatedValue }],
    };

    // Function to verify OTP
    const handleVerifyOTP = async () => {
        const enteredOtp = otp.join(''); // Join OTP digits into a single string

        if (enteredOtp.length !== 4) {
            Alert.alert('Error', 'Please enter the complete 4-digit OTP.');
            return;
        }

        try {
            const response = await axios.post(verifyOtpApiUrl, {
                otp: enteredOtp,
            });

            console.log(response.data); // Handle successful response
            Alert.alert('Success', 'OTP verified successfully!');

            // Redirect to another page after successful verification
            router.push('/Pages');
        } catch (error: any) {
            if (error.response) {
                // Server responded with an error
                console.error(error.response.data);
                Alert.alert('Error', error.response.data.message || 'OTP verification failed. Please try again.');
            } else if (error.request) {
                // Request was made but no response was received
                console.error(error.request);
                Alert.alert('Error', 'No response from server. Please check your connection.');
            } else {
                // General error
                console.error('Error', error.message);
                Alert.alert('Error', error.message);
            }
        }
    };

    // Function to resend OTP
    const handleResendOTP = async () => {
        try {
            setIsResending(true); // Set loading state for resend
            const response = await axios.post(resendOtpApiUrl);
            console.log(response.data); // Handle successful response
            Alert.alert('Success', 'OTP has been resent to your number!');
        } catch (error: any) {
            console.error(error);
            Alert.alert('Error', 'Failed to resend OTP. Please try again.');
        } finally {
            setIsResending(false); // Reset the loading state
        }
    };

    return (
        <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5 overflow-scroll`}>
            <ScrollView
                style={tailwind`flex-1`}
                showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator if needed
            >

                <View style={tailwind`w-full mt-[5%] mb-4 px-3`}>
                    <Text style={tailwind`text-white font-bold text-[27px]`}>Email Verification Code</Text>
                    <Text style={tailwind`text-white font-normal text-[18px] mt-2 `}>
                        Check your email for your 4-digit OTP.
                    </Text>
                </View>

                {/* Scrolling Marquee Text */}
                <View style={tailwind`w-full flex items-center justify-center mb-4`}>
                    {/* <Animated.Text style={[tailwind`w-full ml-[90%] text-[#FFFF45]`, animatedStyle]}>
                        Only MTN users can use this feature
                    </Animated.Text> */}
                </View>

                {/* OTP Input Fields */}
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

                {/* Resend OTP Link */}
                <View style={tailwind`mt-5 w-full flex items-center`}>
                    <TouchableOpacity onPress={handleResendOTP} disabled={isResending}>
                        <Text style={tailwind`text-[#FFFF45] text-center`}>
                            {isResending ? 'Resending...' : 'Resend OTP'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Verify Button */}
                <View style={tailwind`mt-[25%] w-[95%] mx-auto`}>
                    <DefaultButton onPress={handleVerifyOTP} text="Verify OTP" />
                </View>

            </ScrollView>
        </View>
    );
};

export default OTPInput;
import { Pressable, ScrollView, Text, Animated, View, Dimensions } from "react-native"
import { useRef, useEffect } from 'react';
import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput, PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import tailwind from "twrnc"
import MarqueeText from 'react-native-marquee';

const { width } = Dimensions.get('screen');

const index = ({ duration = 15000 }) => {
    const router = useRouter()
    const animatedValue = useRef(new Animated.Value(0)).current;

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
    return (
        <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5 overflow-scroll`}>
            <ScrollView
                style={tailwind`flex-1`}
                showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator if needed
            >

                <View style={tailwind`w-full mt-[5%] mb-4 px-3`}>
                    <Text style={tailwind`text-white font-bold text-[27px]`}>Let’s Get Started</Text>
                    <Text style={tailwind`text-white font-normal text-[18px] mt-2 `}>Create An Account To Get Started.</Text>
                </View>
                
                <View style={tailwind`w-full flex items-center justify-center mb-4`}>
                    <Animated.Text style={[tailwind`w-full ml-[90%] text-[#FFFF45]`, animatedStyle]}>
                        Only MTN users can use this feature
                    </Animated.Text>
                </View>

                <DefaultInput label="Full Name" placeholder="Adebayo Haliah" customCss="w-[95%] mx-auto" />

                <DefaultInput label="Phone Number" placeholder="09120397347" customCss="w-[95%] mx-auto mt-5" />
                <Pressable onPress={() => { router.push('/Auth/signup/email') }}>
                    <Text style={tailwind`text-[#00A859] ml-3 mt-1 text-[14px] font-normal`}>
                        Use email Instead
                    </Text>
                </Pressable>

                <View style={tailwind`mt-10 w-[95%] mx-auto`}>
                    <DefaultButton onPress={()=>{router.push('/Auth/signup/phone-number/OTP')}} text="Register" />
                </View>
                <View style={tailwind`flex flex-row w-full items-center justify-center mt-3`}>
                    <Text style={tailwind`text-white`}>Have an account already?</Text>
                    <Pressable onPress={() => { router.push('/Auth/signin/email') }}>
                        <Text style={tailwind`text-[#00A859] ml-2`}>
                            Sign in
                        </Text>
                    </Pressable>
                </View>

            </ScrollView>

        </View>
    )
}

export default index

import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DefaultButton } from "@/component/reusable/Button";
import { useRouter } from "expo-router";
import tailwind from "twrnc";

const Onboarding = () => {
    const router = useRouter()
    return (
        <View style={tailwind`h-full w-full flex flex-col items-center justify-between py-[40px] px-1 bg-[#0F1219]`}>
            <Image source={require('../../../assets/images/coins.png')} style={tailwind`w-[93%] rounded-lg`} />

                <View style={tailwind`flex flex-row gap-1 mt-[-9]`}>
                    <Pressable onPress={() => { router.push('/Onboarding/tab1') }}>
                        <View style={tailwind`bg-[#464D4D] w-[29px] h-[5px] rounded`}></View>
                    </Pressable>

                    <Pressable onPress={() => { router.push('/Onboarding/tab2') }}>
                        <View style={tailwind`bg-[#33E081] w-[46px] h-[5px] rounded`}></View>
                    </Pressable>

                </View>
                <View style={tailwind`flex items-center px-2`}>
                    <Text style={tailwind`mb-4 text-[25px] text-white font-bold`}>Easy to Play, Big Rewards</Text>
                    <Text style={tailwind`text-center text-[18px] font-normal text-white leading-[24px]`}>Deposit as little as N1000 to get 400 coins and start spinning. Get ready for thrilling gameplay and cash rewards</Text>
                </View>


            <View style={tailwind`w-[90%]`}>
                <DefaultButton onPress={() => { router.push('/Auth/signin/email') }} text="Get Started" />
            </View>

        </View>
    );
};

export default Onboarding;
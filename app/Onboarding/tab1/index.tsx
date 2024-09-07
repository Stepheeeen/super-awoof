import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DefaultButton } from "@/component/reusable/Button";
import { useRouter } from "expo-router";
import tailwind from "twrnc";

const Onboarding = () => {
  const router = useRouter()
  return (
    <View style={tailwind`h-full w-full flex flex-col items-center justify-between py-[40px] px-1 bg-[#0F1219]`}>
      <Image source={require('../../../assets/images/slot_machine.png')} style={tailwind`w-[95%] rounded-lg`} />

      <View style={tailwind`flex flex-row gap-1`}>
        <Pressable onPress={()=>{router.push('/Onboarding/tab1')}}>
        <View style={tailwind`bg-[#33E081] w-[46px] h-[5px] rounded`}></View>
        </Pressable>

        <Pressable onPress={()=>{router.push('/Onboarding/tab2')}}>
        <View style={tailwind`bg-[#464D4D] w-[29px] h-[5px] rounded`}></View>
        </Pressable>
          
      </View>
      <View style={tailwind`flex items-center px-3 mt-[-60px]`}>
        <Text style={tailwind`mb-4 text-[25px] text-white font-[500]`}>Win Big with Super Awoof</Text>
        <Text style={tailwind`text-center text-[16px] font-[500] text-white leading-[23px]`}>Spin the reels and stand a chance to hit the jackpot! Every play gives you a shot at earning more, with easy coin purchases and rewards</Text>
      </View>

      <View style={tailwind`w-full`}>
        <DefaultButton onPress={() => { router.push('/Onboarding/tab2') }} text="Continue" />
      </View>

    </View>
  );
};

// const styles = StyleSheet.create({
//   lineHeight: {
//     lineHeight: 15,
//   },
// });

export default Onboarding;
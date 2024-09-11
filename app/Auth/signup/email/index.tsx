import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput, PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import tailwind from "twrnc"


const index = () => {
    const router = useRouter()
    return (
        <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5 overflow-scroll`}>
            <ScrollView
                style={tailwind`flex-1`}
                showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator if needed
            >
                <View style={tailwind`w-full mt-[5%] mb-4 px-3`}>
                    <Text style={tailwind`text-white font-bold text-[27px]`}>Let’s Get Started</Text>
                    <Text style={tailwind`text-white font-normal text-[18px] mt-2 mb-4`}>Create An Account To Get Started.</Text>
                </View>

                <DefaultInput label="Full Name" placeholder="Adebayo Haliah" customCss="w-[95%] mx-auto" />

                <DefaultInput label="Email Address" placeholder="adebayohaliah@gmail.com" customCss="w-[95%] mx-auto mt-5" />
                <Pressable onPress={() => { router.push('/Auth/signup/phone-number') }}>
                    <Text style={tailwind`text-[#00A859] ml-3 mt-1 text-[14px] font-normal`}>
                        Use Phone Number Instead
                    </Text>

                </Pressable>
                <PasswordInput placeholder="********" label="Create Password" customCss="mt-3 w-[95%] mx-auto" hidden="opacity-0" onPress={''}/>
                <PasswordInput placeholder="********" label="Confirm Password" customCss="mt-3 w-[95%] mx-auto" hidden="opacity-0" onPress={''} />

                <View style={tailwind`mt-10 w-[95%] mx-auto`}>
                    <DefaultButton onPress={''} text="Register" />
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

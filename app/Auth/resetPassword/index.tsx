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
                    <Text style={tailwind`text-white font-bold text-[27px]`}>Create New Password</Text>
                    <Text style={tailwind`text-white font-normal text-[18px] mt-2 mb-4`}>Please enter a new password</Text>
                </View>

                <PasswordInput placeholder="Enter Password" label="New Password" customCss="mt-3 w-[95%] mx-auto" hidden="opacity-0" onPress={''}/>
                <PasswordInput placeholder="Enter Password" label="Confirm Password" customCss="mt-3 w-[95%] mx-auto" hidden="opacity-0" onPress={''} />

                <View style={tailwind`mt-10 w-[95%] mx-auto`}>
                    <DefaultButton onPress={()=>{router.push('/Auth/signin/email')}} text="Reset" />
                </View>

            </ScrollView>

        </View>
    )
}

export default index

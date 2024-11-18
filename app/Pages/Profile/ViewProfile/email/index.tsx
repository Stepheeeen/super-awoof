import { DefaultInput } from "@/component/reusable/Input";
import TabBar from "@/component/reusable/TabBar";
import { Image, Pressable, Text, View, Alert } from "react-native";
import { useRouter } from "expo-router";
import IonIcons from "@expo/vector-icons/Ionicons";
import tailwind from "twrnc";
import { useEffect, useState } from "react";
import { Profile } from "@/app/constants";

const ProfileScreen = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await Profile();
        if (data) {
          setProfileData({
            fullName: data.fullname || "",
            email: data.email || "",
          });
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full`}>
      <View
        style={tailwind`flex flex-row items-center w-full justify-between px-3 py-6 h-[13%] absolute top-0 bg-[#0F1219] z-10 `}
      >
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <IonIcons name="arrow-back" size={25} color="white" />
        </Pressable>

        <Text style={tailwind`ml-[-25px] font-semibold text-[22px] text-white`}>
          View Profile
        </Text>

        <Text></Text>
      </View>

      <View style={tailwind`w-full mt-[25%] mb-2 px-3`}>
        <DefaultInput
          customInput={""}
          label="Full Name"
          placeholder="Full Name"
          customCss="w-[95%] mx-auto my-4"
          onChangeText={() => {}}
          value={profileData.fullName}
          disabled={false}
        />

        <DefaultInput
          customInput={""}
          label="Email"
          placeholder="Email Address"
          customCss="w-[95%] mx-auto"
          onChangeText={() => {}}
          value={profileData.email}
          disabled={false}
        />
      </View>

      <TabBar />
    </View>
  );
};

export default ProfileScreen;

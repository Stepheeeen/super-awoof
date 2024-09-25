import { DefaultButton } from "@/component/reusable/Button";
import { PasswordInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View, Alert } from "react-native";
import tailwind from "twrnc";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdatePassword = () => {
  const router = useRouter();
  
  // State for storing passwords
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // API Endpoint for updating password
  const updatePasswordUrl = "https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/update/password";

  // Function to handle password update
  const handleUpdatePassword = async () => {
    try {
      // Fetch access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem("accessToken");
      
      const response = await axios.post(updatePasswordUrl, {
        oldPassword: oldPassword,
        newPassword: newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Password updated successfully");
        router.push('/Pages/Profile'); // Redirect after successful update
      }
    } catch (error) {
      console.error("Error updating password:", error);
      Alert.alert("Error", "Failed to update password. Please try again.");
    }
  };

  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5 overflow-scroll`}>
      <ScrollView
        style={tailwind`flex-1`}
        showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator if needed
      >
        <View style={tailwind`w-full mt-[5%] mb-4 px-3`}>
          <Text style={tailwind`text-white font-bold text-[27px]`}>Update Password</Text>
          <Text style={tailwind`text-white font-normal text-[18px] mt-2 mb-4`}>Please fill the required fields to update password</Text>
        </View>

        <PasswordInput
          onChangeText={setOldPassword}
          value={oldPassword}
          placeholder="Enter Old Password"
          label="Old Password"
          customCss="mt-3 w-[95%] mx-auto"
          onPress={()=>{router.push('/Auth/passwordReset')}}
          hidden=""
        />
        <PasswordInput
          onPress={()=>{}}
          hidden="hidden"
          onChangeText={setNewPassword}
          value={newPassword}
          placeholder="Enter New Password"
          label="New Password"
          customCss="mt-3 w-[95%] mx-auto"
        />

        <View style={tailwind`mt-10 w-[95%] mx-auto`}>
          <DefaultButton onPress={handleUpdatePassword} text="Update Password" />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdatePassword;

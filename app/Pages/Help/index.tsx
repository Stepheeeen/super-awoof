import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput } from "@/component/reusable/Input";
import TabBar from "@/component/reusable/TabBar";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import tailwind from "twrnc";
import axios from "axios";
import { baseUrl } from "@/app/constants";
import ToastComponent from "@/component/reusable/ToastComponent";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HelpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    if (!email || !name || !message) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields.",
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${baseUrl}/system/email-send`,
        {
          title: name,
          descr: email,
          body: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: "success",
        text1: "Email sent successfully!",
        text2: "We will respond to you soon.",
      });
      setEmail("");
      setName("");
      setMessage("");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to send email. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={tailwind`h-full bg-[#0F1219] w-full`}>
        <View
          style={tailwind`flex flex-row items-center w-full justify-between px-5 py-6 h-[13%] absolute top-0 bg-[#0F1219] z-10`}
        >
          <Image
            source={require("../../../assets/images/favicon.png")}
            style={tailwind`w-[50px] h-[50px]`}
          />
          <Text
            style={tailwind`ml-[-15px] font-semibold text-[22px] text-white`}
          >
            Help
          </Text>
        </View>

        <ScrollView
          style={tailwind`flex-1`}
          showsVerticalScrollIndicator={false}
        >
          <View style={tailwind`mt-[20%] py-10 px-3 pb-[90px]`}>
            <View style={tailwind`w-full mb-4 px-3`}>
              <Text style={tailwind`text-white font-semibold text-[25px]`}>
                Hello, What can we help you with?
              </Text>
              <Text
                style={tailwind`text-white font-light text-[16px] mt-2 mb-4`}
              >
                Send a message with your questions and we will respond.
              </Text>
            </View>

            <KeyboardAvoidingView
              style={{ flex: 1, marginBottom: 80 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <DefaultInput
                customInput={""}
                label="Your Name"
                placeholder="Your Name"
                customCss="w-[95%] mx-auto"
                onChangeText={setName}
                value={name}
              />

              <DefaultInput
                customInput={""}
                label="Email Address"
                placeholder="adebayohaliah@gmail.com"
                customCss="w-[95%] mx-auto mt-4"
                onChangeText={setEmail}
                value={email}
              />

              <View style={tailwind`mt-6`}>
                <Text
                  style={tailwind`text-white mb-2 ml-4 text-[17px] font-normal`}
                >
                  Message
                </Text>
                <TextInput
                  style={tailwind`border mx-auto border-[#34363B] rounded-lg p-3 bg-[#20232A] h-[220px] text-white w-[95%] text-[16px] font-normal`}
                  multiline={true}
                  numberOfLines={7}
                  placeholder="Write message here..."
                  placeholderTextColor="#9CA3AF"
                  onChangeText={setMessage}
                  value={message}
                />
              </View>

              <View style={tailwind`w-[95%] mx-auto mt-8`}>
                <DefaultButton
                  onPress={onSubmit}
                  text={loading ? "Sending..." : "Submit"}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>

      <ToastComponent />
      <TabBar />
    </>
  );
};

export default HelpPage;

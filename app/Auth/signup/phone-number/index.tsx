import {
  Pressable,
  ScrollView,
  Text,
  Animated,
  View,
  Dimensions,
  Alert,
} from "react-native";
import { useRef, useState, useEffect } from "react";
import { DefaultButton } from "@/component/reusable/Button";
import { DefaultInput } from "@/component/reusable/Input";
import { useRouter } from "expo-router";
import tailwind from "twrnc";
import axios from "axios";

const { width } = Dimensions.get("screen");

const Index = ({ duration = 15000 }) => {
  const router = useRouter();
  const animatedValue = useRef(new Animated.Value(0)).current;

  // State for user inputs
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // API endpoint for registration
  const apiUrl =
    "https://super-awoof-d6b48f0a17a5.herokuapp.com/api/v1/account/register";

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

  // Function to handle registration
  const handleRegister = async () => {
    try {
      const response = await axios.post(apiUrl, {
        fullname: fullName,
        phonenumber: phoneNumber,
      });

      console.log(response.data); // Handle successful response
      alert("Registration successful!");

      // Redirect to the OTP verification screen
      router.push("/Auth/signup/phone-number/OTP");
    } catch (error: any) {
      if (error.response) {
        // Server responded with an error
        console.error(error.response.data);
        alert(
          error.response.data.message ||
            "Registration failed. Please try again."
        );
      } else if (error.request) {
        // Request was made but no response was received
        console.error(error.request);
        alert("No response from server. Please check your connection.");
      } else {
        // General error
        console.error("Error", error.message);
        alert(error.message);
      }
    }
  };

  return (
    <View
      style={tailwind`h-full bg-[#0F1219] w-full px-1 py-5 overflow-scroll`}
    >
      <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tailwind`w-full mt-[5%] mb-4 px-3`}>
          <Text style={tailwind`text-white font-bold text-[27px]`}>
            Let’s Get Started
          </Text>
          <Text style={tailwind`text-white font-normal text-[18px] mt-2 `}>
            Create An Account To Get Started.
          </Text>
        </View>

        {/* Scrolling Marquee Text */}
        <View style={tailwind`w-full flex items-center justify-center mb-4`}>
          <Animated.Text
            style={[tailwind`w-full ml-[90%] text-[#FFFF45]`, animatedStyle]}
          >
            Only MTN users can use this feature
          </Animated.Text>
        </View>

        {/* Full Name Input */}
        <DefaultInput
          customInput={""}
          label="Full Name"
          placeholder="John Doe"
          customCss="w-[95%] mx-auto"
          value={fullName}
          onChangeText={setFullName} // Update state with user input
        />

        {/* Phone Number Input */}
        <DefaultInput
          customInput={""}
          label="Phone Number"
          placeholder="09120397347"
          customCss="w-[95%] mx-auto mt-5"
          value={phoneNumber}
          onChangeText={setPhoneNumber} // Update state with user input
        />

        {/* Use email instead option */}
        <Pressable
          onPress={() => {
            router.push("/Auth/signup/email");
          }}
        >
          <Text
            style={tailwind`text-[#00A859] ml-3 mt-1 text-[14px] font-normal`}
          >
            Use email Instead
          </Text>
        </Pressable>

        {/* Register Button */}
        <View style={tailwind`mt-10 w-[95%] mx-auto`}>
          <DefaultButton onPress={handleRegister} text="Register" />
        </View>

        {/* Sign In Option */}
        <View
          style={tailwind`flex flex-row w-full items-center justify-center mt-3`}
        >
          <Text style={tailwind`text-white`}>Have an account already?</Text>
          <Pressable
            onPress={() => {
              router.push("/Auth/signin/email");
            }}
          >
            <Text style={tailwind`text-[#00A859] ml-2`}>Sign in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;

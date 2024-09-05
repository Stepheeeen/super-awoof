import React, { useState, useEffect } from 'react';
import { Image, View } from "react-native";
import tw from 'twrnc';
import LoadingProgressBar from "@/component/reusable/Loading";
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const router = useRouter()

  useEffect(() => {
    // Simulate a loading process
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push('/Onboarding/tab1'), 0);
        }
        return next;
      });
    }, 500); // Adjust the speed as needed
  }, []);
  return (
    <View style={tw`flex-1 justify-center items-center bg-[#0F1219] mt-[-15%] md:mt-[30%]`}>
      <Image
        source={require('../assets/images/logo-normal.png')} // Replace with your logo path
        style={tw`mb-3 md:[mt-[30%]`} 
        resizeMode="contain"
      />

      <LoadingProgressBar progress={progress} />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 24,
//   },
//   main: {
//     flex: 1,
//     justifyContent: "center",
//     maxWidth: 960,
//     marginHorizontal: "auto",
//   },
//   title: {
//     fontSize: 64,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 36,
//     color: "#0F1219",
//   },
// });

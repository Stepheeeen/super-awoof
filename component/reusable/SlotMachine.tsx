import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";

const { width } = Dimensions.get("window");
const iconSize = 90; // Size of each icon image
const numIcons = 7; // Number of different icons

// Import images statically
import icon1 from "../../assets/images/icon1.png";
import icon2 from "../../assets/images/icon2.png";
import icon3 from "../../assets/images/icon3.png";
import icon4 from "../../assets/images/icon4.png";
import icon5 from "../../assets/images/icon5.png";
import icon6 from "../../assets/images/icon6.png";
import icon7 from "../../assets/images/icon7.png";
import tailwind from "twrnc";

const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7];

const SlotMachine = () => {
  const [winner, setWinner] = useState<boolean | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState([getInitialIcons(), getInitialIcons(), getInitialIcons()]);

  const spinner1 = useRef(new Animated.Value(0)).current;
  const spinner2 = useRef(new Animated.Value(0)).current;
  const spinner3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (winner) {
      playWinningSound(); // Play sound as soon as user hits the jackpot
    }
  }, [winner]);

  // Get three different initial icons for each reel
  function getInitialIcons() {
    return icons.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  const startSpin = async () => {
    if (spinning) return; // Prevent spinning if already spinning

    setWinner(null); // Reset winner status
    setSpinning(true); // Set spinning state to true

    // Randomize the icons for each reel
    setReels([getRandomIcons(), getRandomIcons(), getRandomIcons()]);

    // Spin animation for each spinner
    Animated.timing(spinner1, {
      toValue: -iconSize * numIcons,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      spinner1.setValue(0); // Reset animation
    });
    Animated.timing(spinner2, {
      toValue: -iconSize * numIcons,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => {
      spinner2.setValue(0); // Reset animation
    });
    Animated.timing(spinner3, {
      toValue: -iconSize * numIcons,
      duration: 1400,
      useNativeDriver: true,
    }).start(() => {
      spinner3.setValue(0); // Reset animation
      checkWinner(); // Check winner after spin completes
    });

    // Play spin sound (if available)
    // const { sound } = await Audio.Sound.createAsync(require('../../assets/audio/spin.wav'));
    // await sound.playAsync();
  };

  const getRandomIcons = () => {
    return icons.sort(() => 0.5 - Math.random()).slice(0, numIcons); // Randomize icons for the reel
  };

  const checkWinner = () => {
    // Check if the first symbol of each reel matches
    const reel1Symbol = reels[0][0]; // First item of reel 1
    const reel2Symbol = reels[1][0]; // First item of reel 2
    const reel3Symbol = reels[2][0]; // First item of reel 3

    const isWinner =
      reel1Symbol === reel2Symbol && reel2Symbol === reel3Symbol; // All reels match

    setWinner(isWinner); // Set winner state immediately

    setSpinning(false); // Set spinning state to false after spinning
  };

  const playWinningSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/winning_slot.wav")
    );
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      {/* Display the result */}
      <Text style={styles.resultText}>
        {winner === null
          ? "Spinning..."
          : winner
          ? "🤑 Pure skill! Jackpot! 🤑"
          : "You lose!"}
      </Text>

      {/* Slot machine */}
      <View style={styles.spinnerContainer}>
        {/* First spinner */}
        <Animated.View
          style={[styles.spinner, { transform: [{ translateY: spinner1 }] }]}
        >
          {reels[0].map((icon, index) => (
            <Image key={index} source={icon} style={styles.icon} />
          ))}
        </Animated.View>
        {/* Second spinner */}
        <Animated.View
          style={[styles.spinner, { transform: [{ translateY: spinner2 }] }]}
        >
          {reels[1].map((icon, index) => (
            <Image key={index} source={icon} style={styles.icon} />
          ))}
        </Animated.View>
        {/* Third spinner */}
        <Animated.View
          style={[styles.spinner, { transform: [{ translateY: spinner3 }] }]}
        >
          {reels[2].map((icon, index) => (
            <Image key={index} source={icon} style={styles.icon} />
          ))}
        </Animated.View>
      </View>

      {/* Spin button */}
      <TouchableOpacity
        style={tailwind`mt-5 p-4 bg-yellow-500 rounded-lg`}
        onPress={startSpin}
        disabled={spinning}
      >
        <Text style={tailwind`text-white font-bold`}>Spin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    color: "aliceblue",
    marginBottom: 20,
  },
  spinnerContainer: {
    flexDirection: "row",
    gap: 7,
    height: 130, // Container height should match the icon size
    overflow: "hidden",
    backgroundColor: "transparent", // Spinner container's background color is transparent
  },
  spinner: {
    width: "auto",
    padding: 5,
    height: iconSize * numIcons, // Height to accommodate all icons
    backgroundColor: "#02281654", // Spinner background color
    borderRadius: 10,
  },
  icon: {
    width: iconSize,
    height: iconSize,
    borderRadius: 10, // Rounded corners
    marginVertical: 20, // Margin top and bottom
    padding: 25, // Padding around icon
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SlotMachine;

// import React, { useState, useRef } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
// import { Audio } from 'expo-av';

// const { width } = Dimensions.get('window');
// const iconHeight = 188;  // Adjust this based on your image sprite height

// const images = [
//   require('../../assets/images/fish.png'),
//   require('../../assets/images/seven.png'),
//   require('../../assets/images/gem.png'),
//   require('../../assets/images/chest.png'),
//   require('../../assets/images/coins.png'),
//   require('../../assets/images/heart.png'),
//   require('../../assets/images/lock.png'),
//   // Add more images up to 21 if needed
// ];

// const SlotMachine = () => {
//   const [winner, setWinner] = useState<boolean | null>(null);
//   const [spinSound, setSpinSound] = useState<Audio.Sound | null>(null);

//   const spinner1 = useRef(new Animated.Value(0)).current;
//   const spinner2 = useRef(new Animated.Value(0)).current;
//   const spinner3 = useRef(new Animated.Value(0)).current;

//   const startSpin = async () => {
//     setWinner(null); // Reset winner status

//     // Spin animation for each spinner
//     Animated.timing(spinner1, { toValue: -iconHeight * images.length, duration: 1000, useNativeDriver: true }).start();
//     Animated.timing(spinner2, { toValue: -iconHeight * images.length, duration: 1400, useNativeDriver: true }).start();
//     Animated.timing(spinner3, { toValue: -iconHeight * images.length, duration: 2200, useNativeDriver: true }).start();

//     // Play spin sound (using expo-av)
//     // const { sound } = await Audio.Sound.createAsync(require('../../assets/audio/winning_slot.wav')); // Your spin sound
//     // setSpinSound(sound);
//     // await sound.playAsync();

//     // Check if all reels match after spinning
//     checkWinner();
//   };

//   const checkWinner = () => {
//     // Logic to check if all three spinners landed on the same item
//     const isWinner = Math.random() > 0.5; // Simulated result
//     setWinner(isWinner);

//     if (isWinner) {
//       playWinningSound();  // Play winning sound
//     }
//   };

//   const playWinningSound = async () => {
//     const { sound } = await Audio.Sound.createAsync(require('../../assets/audio/winning_slot.wav'));
//     await sound.playAsync();
//   };

//   return (
//     <View style={styles.container}>
//       {/* Display the result */}
//       <Text style={styles.resultText}>
//         {/* {winner === null ? 'Spinning...' : winner ? '🤑 Pure skill! 🤑' : 'You lose!'} */}
//       </Text>

//       {/* Slot machine */}
//       <View style={styles.spinnerContainer}>
//         {/* First spinner */}
//         <Animated.View
//           style={[styles.spinner, { transform: [{ translateY: spinner1 }] }]}
//         >
//           {images.map((image, index) => (
//             <Image
//               key={index}
//               source={image}
//               style={styles.icon}
//             />
//           ))}
//         </Animated.View>
//         {/* Second spinner */}
//         <Animated.View
//           style={[styles.spinner, { transform: [{ translateY: spinner2 }] }]}
//         >
//           {images.map((image, index) => (
//             <Image
//               key={index}
//               source={image}
//               style={styles.icon}
//             />
//           ))}
//         </Animated.View>
//         {/* Third spinner */}
//         <Animated.View
//           style={[styles.spinner, { transform: [{ translateY: spinner3 }] }]}
//         >
//           {images.map((image, index) => (
//             <Image
//               key={index}
//               source={image}
//               style={styles.icon}
//             />
//           ))}
//         </Animated.View>
//       </View>

//       {/* Spin button */}
//       <TouchableOpacity style={styles.spinButton} onPress={startSpin}>
//         <Text style={styles.buttonText}>Spin</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#292929',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   resultText: {
//     fontSize: 24,
//     color: 'aliceblue',
//     marginBottom: 20,
//   },
//   spinnerContainer: {
//     flexDirection: 'row',
//     // height: iconHeight,
//     overflow: 'hidden',
//   },
//   spinner: {
//     flexDirection: 'column',
//     // height: iconHeight * 7, // Adjust based on the number of images
//   },
//   icon: {
//     width: 128,
//     // height: iconHeight,
//   },
//   spinButton: {
//     marginTop: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 40,
//     backgroundColor: 'purple',
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default SlotMachine;

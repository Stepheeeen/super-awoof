import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
// import { Audio } from "expo-av";

const { width } = Dimensions.get("window");
const iconSize = 80; // Size of each icon image
const numIcons = 7; // Number of different icons

// Import images statically
import icon1 from "../../assets/images/icon1.png";
import icon2 from "../../assets/images/icon2.png";
import icon3 from "../../assets/images/icon3.png";
import icon4 from "../../assets/images/icon4.png";
import icon5 from "../../assets/images/icon5.png";
import icon6 from "../../assets/images/icon6.png";
import icon7 from "../../assets/images/icon7.png";
import icon8 from "../../assets/images/icon7.png";
import icon9 from "../../assets/images/icon7.png";
import icon10 from "../../assets/images/icon7.png";
import tailwind from "twrnc";
import ModalContainer from "./Modal";
import { router } from "expo-router";
import { difficultyType } from "../types";

const icons = [
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
  icon10,
];

const rewardPrices = {
  regular: 50000,
  jackpot: 100000,
};

const SlotMachine = ({
  submitWinner,
  difficulty,
  checkBalance,
  handleClick,
}: {
  submitWinner: any
  difficulty: difficultyType;
  checkBalance: any;
  handleClick: any;
}) => {
  const [winner, setWinner] = useState<boolean | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [winningModal, setWinningModal] = useState(false);
  const [fundAcct, setFundAcct] = useState(false);
  const [rewardPrice, setRewardPrice] = useState<number | null>(null); // New state for reward price
  const [reels, setReels] = useState([
    getInitialIcons(),
    getInitialIcons(),
    getInitialIcons(),
  ]);

  const spinner1 = useRef(new Animated.Value(0)).current;
  const spinner2 = useRef(new Animated.Value(0)).current;
  const spinner3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (winner) {
      // playWinningSound(); // Play sound as soon as user hits the jackpot
    }
  }, [winner]);

  useEffect(() => {
    // Check winner whenever the reels update
    if (!spinning) {
      checkWinner(); // Call winner check after spinning ends and reels are updated
    }
  }, [reels, spinning]);

  // Get three different initial icons for each reel
  function getInitialIcons() {
    return icons.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  const startSpin = async () => {
    if (spinning) return; // Prevent spinning if already spinning

    const balanceIsSufficient = await checkBalance();
    if (!balanceIsSufficient) {
      setFundAcct(true);
      return;
    }

    setWinner(null); // Reset winner status
    setSpinning(true); // Set spinning state to true

    // Randomize the icons for each reel
    const newReels = getReelOutcome();
    setReels(newReels); // Set the new randomized icons

    // Spin animation for each spinner
    Animated.timing(spinner1, {
      toValue: -iconSize * numIcons,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => {
      spinner1.setValue(0); // Reset animation
    });

    Animated.timing(spinner2, {
      toValue: -iconSize * numIcons,
      duration: 1400,
      useNativeDriver: true,
    }).start(() => {
      spinner2.setValue(0); // Reset animation
    });

    Animated.timing(spinner3, {
      toValue: -iconSize * numIcons,
      duration: 1600,
      useNativeDriver: true,
    }).start(() => {
      spinner3.setValue(0); // Reset animation
      setSpinning(false); // Stop spinning after the last reel stops
    });
  };

  const getRandomIcons = () => {
    return icons.sort(() => 0.5 - Math.random()).slice(0, numIcons); // Randomize icons for the reel
  };

  const checkWinner = () => {
    const reel1Symbol = reels[0][0]; // First item of reel 1
    const reel2Symbol = reels[1][0]; // First item of reel 2
    const reel3Symbol = reels[2][0]; // First item of reel 3
    const isWinner = reel1Symbol === reel2Symbol && reel2Symbol === reel3Symbol; // All reels match

    // if (isWinner) {
    //   submitWinner();
    //   setTimeout(() => {
    //     setWinningModal(true);
    //   }, 500);
    // }

    if (isWinner) {
      if (reel1Symbol === icon7) {
        // Jackpot
        setRewardPrice(rewardPrices.jackpot);
      } else {
        // Regular win
        setRewardPrice(rewardPrices.regular);
      }
      submitWinner();
      setTimeout(() => {
        setWinningModal(true);
      }, 500);
    }

    setWinner(isWinner); // Update winner state
  };

  // const playWinningSound = async () => {
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("../../assets/audio/winning_slot.wav")
  //   );
  //   await sound.playAsync();
  // };

  const handleWinnerLink = async () => {
    const url = "https://forms.gle/a7JwchrYgKJKzWjZ8"; // Replace with your external link

    // Check if the URL can be opened
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Open the URL
      await Linking.openURL(url);
    } else {
      // Show an alert if the URL can't be opened
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const getReelOutcome = () => {
    let isWinningOutcome = false;
    const randomNum = Math.random();

    switch (difficulty) {
      case "medium":
        isWinningOutcome = randomNum < 0.6;
        break;
      case "hard":
        isWinningOutcome = randomNum < 0.3;
      case "difficult":
        isWinningOutcome = randomNum < 0.1;
      case "impossible":
        isWinningOutcome = false;
        break;
    }

    if (isWinningOutcome) {
      const winningSymbol = icons[Math.floor(Math.random() * icons.length)];
      return [
        [winningSymbol, icons[1], icons[2]],
        [winningSymbol, icons[3], icons[4]],
        [winningSymbol, icons[5], icons[6]],
      ];
    } else {
      return [getRandomIcons(), getRandomIcons(), getRandomIcons()];
    }
  };

  return (
    <>
      <View style={tailwind`w-[95%] relative h-[300px]`}>
        <Image
          source={require("../../assets/images/Slot_Bg.png")}
          style={tailwind`w-full h-full`}
        />

        <View
          style={tailwind`absolute top-0 w-full h-full left-0 p-5 px-3 flex-row`}
        >
          <View style={styles.container}>
            {/* Display the result */}
            <Text style={styles.resultText}>
              {winner === null
                ? "Spinning..."
                : winner
                ? "🤑! Jackpot ! 🤑"
                : "You lose, Keep going!"}
            </Text>

            {/* Slot machine */}
            <View style={styles.spinnerContainer}>
              {/* First spinner */}
              <View
                style={tailwind`bg-[#02291654] flex items-center rounded-lg px-1`}
              >
                <Animated.View
                  style={[
                    styles.spinner,
                    { transform: [{ translateY: spinner1 }] },
                  ]}
                >
                  {reels[0].map((icon, index) => (
                    <Image key={index} source={icon} style={styles.icon} />
                  ))}
                </Animated.View>
              </View>

              {/* Second spinner */}
              <View
                style={tailwind`bg-[#02291654] flex items-center rounded-lg px-1`}
              >
                <Animated.View
                  style={[
                    styles.spinner,
                    { transform: [{ translateY: spinner2 }] },
                  ]}
                >
                  {reels[1].map((icon, index) => (
                    <Image key={index} source={icon} style={styles.icon} />
                  ))}
                </Animated.View>
              </View>

              {/* Third spinner */}
              <View
                style={tailwind`bg-[#02291654] flex items-center rounded-lg px-1`}
              >
                <Animated.View
                  style={[
                    styles.spinner,
                    { transform: [{ translateY: spinner3 }] },
                  ]}
                >
                  {reels[2].map((icon, index) => (
                    <Image key={index} source={icon} style={styles.icon} />
                  ))}
                </Animated.View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Spin button */}
      <TouchableOpacity
        style={tailwind`mt-[80px]`}
        onPress={startSpin}
        disabled={spinning}
      >
        <Image
          source={require("../../assets/images/SpinBtn.png")}
          style={tailwind``}
        />
      </TouchableOpacity>

      <ModalContainer
        modalVisible={winningModal}
        onClose={() => setWinningModal(false)}
        ButtonText={"Proceed"}
        HeadText={
          <View
            style={tailwind`ml-[50%] w-full flex justify-center items-center`}
          >
            <Image source={require("../../assets/images/Trophy.png")} />
            <Text style={tailwind`text-white mt-5 text-[28px] font-bold ml-2`}>
              JACKPOT
            </Text>
          </View>
        }
        SubText="Congratulations, you just won Jackpot. Proceed to redeem your cash price."
        handleClick={handleWinnerLink}
        cancelText={""}
        ModalHeadText=""
      />

      <ModalContainer
        modalVisible={fundAcct}
        onClose={() => setFundAcct(false)}
        ButtonText={"Deposit"}
        HeadText={
          <View style={tailwind`w-full flex justify-center items-center`}>
            <Text style={tailwind`text-white text-[25px] font-normal mb-3`}>
              Insufficient Balance
            </Text>
            <Text
              style={tailwind`text-white text-center mt-6 text-base font-normal`}
            >
              You have 0 coins.
            </Text>
            <Text
              style={tailwind`text-white text-center mt-2 text-base font-normal`}
            >
              Please deposit to continue.
            </Text>
          </View>
        }
        SubText=""
        handleClick={handleClick}
        cancelText={""}
        ModalHeadText=""
      />
    </>
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
    marginBottom: 30,
  },
  spinnerContainer: {
    flexDirection: "row",
    // gap: 7,
    height: 130, // Container height should match the icon size
    overflow: "hidden",
    backgroundColor: "transparent", // Spinner container's background color is transparent
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  spinner: {
    width: "100%",
    padding: 5,
    paddingHorizontal: 7,
    height: iconSize * numIcons, // Height to accommodate all icons
    // backgroundColor: "#02281654", // Spinner background color
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
  },
  icon: {
    width: iconSize,
    height: iconSize,
    // borderRadius: 10, // Rounded corners
    marginTop: 25, // Margin top and bottom
    padding: 25, // Padding around icon
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SlotMachine;

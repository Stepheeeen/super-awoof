import { DefaultButton } from "@/component/reusable/Button";
import SlotMachine from "@/component/reusable/SlotMachine";
import TabBar from "@/component/reusable/TabBar";
import { Image, Pressable, Text, View } from "react-native";
import tailwind from "twrnc";
import { baseUrl } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import ModalContainer from "@/component/reusable/Modal";
import { useRouter } from "expo-router";
import useProfile from "../hooks/useProfile";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [deductedCoins, setDeductedCoins] = useState<number>(0); // Track deducted coins count
  const [deposit, setDeposit] = useState(false);
  // const [difficulty, setDifficulty] = useState<difficultyType | any>("medium");
  const router = useRouter();
  const User: any = useProfile();

  // Fetch user data and deducted coin count on initial load
  useEffect(() => {
    const func = async () => {
      const userData = (await AsyncStorage.getItem("user")) as any;
      setUser(JSON.parse(userData));
    };
    func();
  }, []);

  // Check balance when coins change and show balance modal
  // useEffect(() => {
  //   if (user?.coins === 0) {
  //     setDeposit(true);
  //   }
  // }, [user?.coins]);

  // Handle button click: Deduct 1 coin
  const handleButtonClick = async () => {
    if (!user || user.coins <= 0) return;

    // Deduct 1 coin from the user balance
    const newBalance = user.coins - 1;
    const updatedUser = { ...user, coins: newBalance };

    // Update the local state and AsyncStorage
    setUser(updatedUser);

    await AsyncStorage.setItem("user", JSON.stringify(user));

    await sendUpdatedCoinsToBackend(newBalance);
  };

  // Send the deducted coins count to the backend
  const sendDeductedCoinsToBackend = async (deductedCoins: number) => {
    try {
      const access = await AsyncStorage.getItem("accessToken");

      console.log("Sending deducted coins to backend:", deductedCoins);
      console.log("Access token:", access);
      console.log("URL:", `${baseUrl}/account/reduce-coins/${deductedCoins}`);

      const response = await axios.post(
        `${baseUrl}/account/reduce-coins/${deductedCoins}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (response.data.success) {
        await AsyncStorage.setItem("deductedCoins", "0");
        setDeductedCoins(0); // Reset local state as well
      }
    } catch (error) {
      console.error("Error sending deducted coins:", error);
    }
  };

  // Send the updated coins count to the backend
  const sendUpdatedCoinsToBackend = async (updatedCoins: number) => {
    try {
      const access = await AsyncStorage.getItem("accessToken");

      console.log("Sending updated coins to backend:", deductedCoins);

      const response = await axios.post(
        `${baseUrl}/account/update-coins/${updatedCoins}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (response.data.success) {
        // setDeductedCoins(0);
      }
    } catch (error) {
      console.error("Error sending updated coins:", error);
    }
  };

  return (
    <>
      <View style={tailwind`h-full bg-[#0F1219] w-full`}>
        <View
          style={tailwind`flex flex-row items-center w-full justify-between px-4 pt-6 h-[10%] absolute top-0`}
        >
          <Image
            source={require("../../assets/images/favicon.png")}
            style={tailwind`w-[50px] h-[50px]`}
          />

          <Pressable
            style={tailwind`flex flex-row items-center bg-[#20232A] py-[2px] px-2 rounded`}
            onPress={() => {
              setDeposit(true);
            }}
          >
            <Image
              source={require("../../assets/images/AwoofCoin.png")}
              style={tailwind``}
            />
            <Text style={tailwind`text-white text-[17px] mb-1 ml-1`}>
              {user?.coins || 0}
            </Text>
          </Pressable>
        </View>

        <View style={tailwind`mt-[22%] w-full pt-8`}>
          <View
            style={tailwind`w-full flex items-center justify-center relative h-[530px]`}
          >
            <SlotMachine
              handleClick={() => {
                router.push("/Pages/Extras/Deposit/");
              }}
              checkBalance={user?.coins}
              difficulty={"aggressive"}
              submitWinner={() => {}}
              deductCoins={() => handleButtonClick()}
            />
          </View>
        </View>

        <TabBar />
      </View>

      {/* Deposit Balance Modal */}
      <ModalContainer
        modalVisible={deposit}
        onClose={() => setDeposit(false)}
        ButtonText={"Deposit"}
        HeadText={
          <>
            <Text
              style={tailwind`text-white text-[25px] font-normal ml-[25%] mb-3`}
            >
              Balance
            </Text>
          </>
        }
        SubText={
          <>
            <Image
              source={require("../../assets/images/AwoofCoin.png")}
              style={tailwind``}
            />
            <Text style={tailwind`text-white text-[25px] font-medium ml-2`}>
              {User?.coins || 0}
            </Text>
          </>
        }
        handleClick={() => {
          router.push("/Pages/Extras/Deposit/");
        }}
        cancelText={
          <Pressable
            onPress={() => {
              router.push("/Pages/Extras/Wallet/");
            }}
            style={tailwind` w-[100%] mt-2`}
          >
            <Text style={tailwind`underline text-white text-[16px]`}>Wallet</Text>
          </Pressable>
        }
        ModalHeadText=""
      />
    </>
  );
};

export default Index;

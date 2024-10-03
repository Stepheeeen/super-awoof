import { DefaultButton } from "@/component/reusable/Button";
import SlotMachine from "@/component/reusable/SlotMachine";
import Spinner from "@/component/reusable/Spinner";
import TabBar from "@/component/reusable/TabBar";
// import React, { useRef, useState, RefObject } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";
import Sound from "react-native-sound";
import tailwind from "twrnc";
import { baseUrl } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import ModalContainer from "@/component/reusable/Modal";
import { useRouter } from "expo-router";
import { difficultyType } from "@/component/types";
import React from "react";

const index = () => {
  const [user, setUser] = useState<any>(null);
  const [deposit, setDeposit] = useState(false);
  const [algoLevel, setAlgoLevel] = useState<difficultyType>("medium");
  const router = useRouter();


  useEffect(() => {
    const func = async () => {
      const userData = (await AsyncStorage.getItem("user")) as any;
      setUser(JSON.parse(userData));
      
      const access = await AsyncStorage.getItem("accessToken");

      try {
        const response = await axios.get(`${baseUrl}/system/algo-level`, {
          headers: {
            Authorization: `Bearer ${access}`,
          }
        })      
        
       switch (response?.data?.data) {
        case "Hard":
          setAlgoLevel("hard")
          break;
        case "Aggressive":
          setAlgoLevel("difficult")
        case "Impossible":
          setAlgoLevel("impossible")
        default:
          setAlgoLevel("medium")
          break;
       }
      } catch (e:any) {
        console.error(e);
      }

    };
    func();
  }, []);

  const submitWinner = async () => {
    try {
      const access = await AsyncStorage.getItem("accessToken");

      const response = await axios.post(
        `${baseUrl}/system/winner`,
        {
          amount: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      console.log(response.data);
      setUser({ ...user, coins: response?.data?.coins || user.coins });
    } catch (e: any) {
      console.error(e);
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
            <SlotMachine submitWinner={submitWinner} difficulty={algoLevel} />
          </View>
        </View>

        <TabBar />
      </View>

      <ModalContainer
        modalVisible={deposit}
        onClose={() => setDeposit(false)}
        ButtonText={"Deposit"}
        HeadText={
          <View style={tailwind`w-full flex justify-center items-center`}>
            <Text
              style={tailwind`text-white text-[25px] font-normal ml-[25%] mb-3`}
            >
              Balance
            </Text>
            <View
              style={tailwind`w-[70%] ml-[25%] h-auto flex flex-row bg-[#31524D] rounded-lg p-3 justify-center items-center`}
            >
              <Image
                source={require("../../assets/images/AwoofCoin.png")}
                style={tailwind``}
              />
              <Text style={tailwind`text-white text-[25px] font-medium ml-2`}>
                {user?.coins || 0}
              </Text>
            </View>
          </View>
        }
        SubText=""
        handleClick={() => {
          router.push("/Pages/Extras/Deposit");
        }}
        cancelText={""}
        ModalHeadText=""
      />
    </>
  );
};

export default index;

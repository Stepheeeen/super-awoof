import { DefaultButton } from '@/component/reusable/Button';
import SlotMachine from '@/component/reusable/SlotMachine';
import Spinner from '@/component/reusable/Spinner';
import TabBar from '@/component/reusable/TabBar'
// import React, { useRef, useState, RefObject } from 'react';
import { Image, ImageBackground, Pressable, Text, TouchableOpacity, View } from 'react-native'
import Sound from 'react-native-sound';
import tailwind from 'twrnc'
import { baseUrl } from '../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const index = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const func = async ()=> {
      const userData = await AsyncStorage.getItem("user") as any;
      setUser(JSON.parse(userData));
    }
    func();
  }, [])
  
  const submitWinner = async ()=> {
    try {
      const access = await AsyncStorage.getItem("accessToken");

      const response = await axios.post(`${baseUrl}/system/winner`, {
        amount: 100,
      }, {headers: {
        Authorization: `Bearer ${access}`
      }});

      console.log(response.data);
    } catch (e:any) {
      console.error(e);
    }
  }

  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full`}>
      <View style={tailwind`flex flex-row items-center w-full justify-between px-4 pt-6 h-[10%] absolute top-0`}>
        <Image source={require('../../assets/images/favicon.png')} style={tailwind`w-[50px] h-[50px]`} />

        <Pressable style={tailwind`flex flex-row items-center bg-[#20232A] py-[2px] px-2 rounded`}>
          <Image source={require('../../assets/images/AwoofCoin.png')} style={tailwind``} />
          <Text style={tailwind`text-white text-[17px] mb-1 ml-1`}>
            {user?.coins || 0}
          </Text>
        </Pressable>
      </View>

      <View style={tailwind`mt-[22%] w-full`}>
        <View style={tailwind`w-full flex items-center justify-center relative h-[430px]`}>

          <View style={tailwind`w-[90%] relative h-[417px]`}>
            <Image source={require('../../assets/images/Slot_Bg.png')} style={tailwind`w-full h-full`} />

            <View style={tailwind`absolute top-0 w-full h-full left-0 p-5 flex-row`}>
                <SlotMachine submitWinner = {submitWinner}/>
            </View>
          </View>
        </View>
      </View>

      <TabBar />
    </View>
  )
}

export default index

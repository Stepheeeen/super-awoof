import { DefaultButton } from '@/component/reusable/Button';
import SlotMachine from '@/component/reusable/SlotMachine';
import Spinner from '@/component/reusable/Spinner';
import TabBar from '@/component/reusable/TabBar'
// import React, { useRef, useState, RefObject } from 'react';
import { Image, ImageBackground, Pressable, Text, TouchableOpacity, View } from 'react-native'
import Sound from 'react-native-sound';
import tailwind from 'twrnc'

const index = () => {
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full`}>
      <View style={tailwind`flex flex-row items-center w-full justify-between px-4 pt-6 h-[10%] absolute top-0`}>
        <Image source={require('../../assets/images/favicon.png')} style={tailwind`w-[50px] h-[50px]`} />

        <Pressable style={tailwind`flex flex-row items-center bg-[#20232A] py-[2px] px-2 rounded`}>
          <Image source={require('../../assets/images/AwoofCoin.png')} style={tailwind``} />
          <Text style={tailwind`text-white text-[17px] mb-1 ml-1`}>
            6000
          </Text>
        </Pressable>
      </View>

      <View style={tailwind`mt-[22%] w-full`}>
        <View style={tailwind`w-full flex items-center justify-center relative h-[430px]`}>

          <View style={tailwind`w-[90%] relative h-[417px]`}>
            <Image source={require('../../assets/images/Slot_Bg.png')} style={tailwind`w-full h-full`} />

            <View style={tailwind`absolute top-0 w-full h-full left-0 p-5 flex-row`}>
                <SlotMachine/>
            </View>
          </View>

          <TouchableOpacity onPress={()=>{}} style={tailwind`mt-5 p-4 bg-yellow-500 rounded-lg`}>
            <Text style={tailwind`text-white font-bold`}>Spin</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TabBar />
    </View>
  )
}

export default index

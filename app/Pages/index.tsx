import TabBar from '@/component/reusable/TabBar'
import { Image, Pressable, Text, View } from 'react-native'
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
      
      <View style={tailwind`mt-[20%]`}>

      <Text style={tailwind`text-center text-white`}>Hello</Text>
      </View>

      <TabBar />
    </View>
  )
}

export default index

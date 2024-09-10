import TabBar from '@/component/reusable/TabBar'
import { Text, View } from 'react-native'
import tailwind from 'twrnc'

const index = () => {
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full`}>
        <Text>Hello</Text>

        <TabBar/>
    </View>
  )
}

export default index

import { TextInput, View } from "react-native"
import tailwind from "twrnc"


const index = () => {
  return (
    <View style={tailwind`h-full bg-[#0F1219]`}>
        <TextInput
        style={tailwind`border border-gray-300 rounded-lg p-2 w-full h-[40px]`}
        placeholder="Enter text"
        placeholderTextColor="gray"
        />
    </View>
  )
}

export default index

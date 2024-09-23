import { DefaultInput } from "@/component/reusable/Input";
import { useState } from "react";
import TabBar from "@/component/reusable/TabBar";
import { Image, Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import tailwind from "twrnc";
import Modal from "@/component/reusable/Modal";

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  return (
    <View style={tailwind`h-full bg-[#0F1219] w-full`}>
      <View
        style={tailwind`flex flex-row items-center w-full justify-between px-5 py-6 h-[13%] absolute top-0 bg-[#0F1219] z-10 `}
      >
        <Image
          source={require("../../../assets/images/favicon.png")}
          style={tailwind`w-[50px] h-[50px]`}
        />
        <Text style={tailwind`ml-[-15px] font-semibold text-[22px] text-white`}>
          Profile
        </Text>
        <Pressable
          style={tailwind`flex flex-row items-center py-[2px] px-2 rounded`}
          onPress={() => {}}
        ></Pressable>
      </View>

      <View style={tailwind`mt-[20%] py-6 w-full`}>
        <Pressable
          style={tailwind`flex flex-row items-center w-full justify-between py-3 px-5`}
        >
          <View style={tailwind`flex flex-row items-center`}>
            <AntDesign name="profile" size={25} color="white" />
            <Text style={tailwind`text-white text-[18px] ml-3`}>
              View Profile
            </Text>
          </View>

          <MaterialIcons name="navigate-next" size={25} color="white" />
        </Pressable>
        <Pressable
          style={tailwind`flex flex-row items-center w-full justify-between py-3 px-5 mt-1 mb-3`}
          onPress={() => {}}
        >
          <View style={tailwind`flex flex-row`}>
            <MaterialIcons name="lock-reset" size={25} color="white" />
            <Text style={tailwind`text-white text-[18px] ml-3`}>
              Reset Password
            </Text>
          </View>

          <MaterialIcons name="navigate-next" size={25} color="white" />
        </Pressable>

        <View style={tailwind`w-[87%] mx-auto my-5 h-[1px] bg-[#343434]`}></View>

        <Pressable
          style={tailwind`flex flex-row items-center w-full justify-between py-3 px-5 mt-3`}
          onPress={() => setModalVisible(true)}
        >
          <View style={tailwind`flex flex-row`}>
            <Feather name="power" size={23} color="white" />
            <Text style={tailwind`text-white text-[18px] ml-3`}>Logout</Text>
          </View>

          <MaterialIcons name="navigate-next" size={25} color="white" />
        </Pressable>

        <Pressable
          style={tailwind`flex flex-row items-center w-full justify-between py-3 px-5 my-1`}
          onPress={() => {
            setDeleteAccount(true);
          }}
        >
          <View style={tailwind`flex flex-row items-center ml-[-4px]`}>
            <EvilIcons name="trash" size={30} color="white" />
            <Text style={tailwind`text-white text-[18px] ml-2 mt-1`}>
              Delete Account
            </Text>
          </View>

          <MaterialIcons name="navigate-next" size={25} color="white" />
        </Pressable>
      </View>

      <Modal
        modalVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        ButtonText={"Log out"}
        HeadText="Logging Out?"
        SubText="Are you sure you want to log out from your SupaAwoof account?"
        handleClick={() => {}}
        cancelText={
          <Text style={tailwind`underline my-2 text-white`}>No, Cancel</Text>
        }
        ModalHeadText=""
      />

      <Modal
        modalVisible={deleteAccount}
        onClose={() => {
          setDeleteAccount(false);
        }}
        ButtonText={"Delete Account"}
        HeadText="Delete Account?"
        SubText="Are you sure you want to delete your SupaAwoof account?"
        handleClick={() => {}}
        cancelText={
          <Text style={tailwind`underline my-2 text-white`}>No, Cancel</Text>
        }
        ModalHeadText=""
      />

      <TabBar />
    </View>
  );
};

export default Index;

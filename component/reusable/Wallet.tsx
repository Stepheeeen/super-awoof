import React, { useState } from "react";
import {
  ImageBackground,
  Modal,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import tailwind from "twrnc";
import { DefaultButton } from "./Button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker"; // Import Picker component
import { DefaultInput } from "./Input";

export const WalletCard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(""); // State for account selection
  const [accountNumber, setAccountNumber] = useState(""); // State for account number
  const [amount, setAmount] = useState(""); // State for amount

  return (
    <>
      <ImageBackground
        source={require("../../assets/images/WalletBg.png")}
        resizeMode="cover"
        style={tailwind`bg-[#00A859]/30 rounded-lg w-full mx-auto h-[200px] mt-5`}
      >
        <View style={tailwind`w-full h-full bg-black/40 rounded-lg p-4`}>
          <Text style={tailwind`text-white text-center`}>Wallet Balance</Text>
          <Text
            style={tailwind`text-white text-center mb-8 mt-1 font-semibold text-[38px]`}
          >
            ₦ 20,000
          </Text>

          <DefaultButton
            onPress={() => setModalVisible(true)} // Fixed onPress callback
            text="Withdraw"
          />
        </View>
      </ImageBackground>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tailwind`flex-1 justify-center items-center bg-black/50`}>
          <View style={tailwind`bg-[#191B21] rounded-lg p-6 w-5/6 relative`}>
            {/* Close Button */}
            <TouchableOpacity
              style={tailwind`absolute top-2 right-2 rounded-lg px-2 py-2`}
              onPress={() => setModalVisible(false)}
            >
              <MaterialIcons name="cancel" size={24} color="white" />
            </TouchableOpacity>

            {/* Title */}
            <Text
              style={tailwind`text-lg font-bold text-white text-center mb-4`}
            >
              Confirm Withdrawal
            </Text>

            {/* Select Input for Account */}
            <View style={tailwind`bg-[#282C34] rounded-lg mb-4`}>
              <Picker
                selectedValue={selectedAccount}
                onValueChange={(itemValue) => setSelectedAccount(itemValue)}
                style={tailwind`text-white`}
              >
                <Picker.Item label="Select Account" value="" color="#000" />
                <Picker.Item
                  label="Savings Account"
                  value="savings"
                  color="#000"
                />
                <Picker.Item
                  label="Current Account"
                  value="current"
                  color="#000"
                />
              </Picker>
            </View>

            {/* Account Number Input */}
            <TextInput
              style={tailwind`bg-[#282C34] text-white rounded-lg px-4 py-3 mb-4`}
              placeholder="Enter Account Number"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={accountNumber}
              onChangeText={setAccountNumber}
            />

            {/* Amount Input */}
            <TextInput
              style={tailwind`bg-[#282C34] text-white rounded-lg px-4 py-3 mb-6`}
              placeholder="Enter Amount"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            {/* Withdraw Button */}
            <DefaultButton
              onPress={() => {
                if (!selectedAccount || !accountNumber || !amount) {
                  alert("Please fill all fields");
                  return;
                }
                setModalVisible(false);
                // Handle withdrawal logic here
                console.log({
                  selectedAccount,
                  accountNumber,
                  amount,
                });
              }}
              text="Withdraw"
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

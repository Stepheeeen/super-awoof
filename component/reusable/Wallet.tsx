import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Modal,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import tailwind from "twrnc";
import { DefaultButton } from "./Button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { baseUrl, getAccessToken } from "@/app/constants";
import { router } from "expo-router";
import { DisabledButton } from "./DisabledButton";

export const WalletCard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [banks, setBanks] = useState([]);
  const [beneficiaryName, setBeneficiaryName] = useState("");

  useEffect(() => {
    const fetchBeneficiaryName = async () => {
      if (accountNumber.length === 10) {
        try {
          const response = await axios.get(
            `${baseUrl}/wallet/confirm-account?accountNo=${accountNumber}&bankCode=${selectedAccount}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setBeneficiaryName(
            response.data?.data?.account_name || "Invalid Account"
          );
        } catch (error: any) {
          console.error(
            "Failed to fetch beneficiary name:",
            error.response.data
          );
          setBeneficiaryName("Error retrieving name");
        }
      } else {
        setBeneficiaryName("");
      }
    };

    fetchBeneficiaryName();
  }, [accountNumber, selectedAccount]);

  useEffect(() => {
    const getWalletBalance = async () => {
      try {
        const res = await axios.get(`${baseUrl}/wallet`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setBalance(res.data.balance);
      } catch (error: any) {
        console.error(error.data);
      }
    };
    getWalletBalance();
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessToken();
        setAccessToken(token);
      } catch (error) {
        console.error("Failed to fetch access token:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const ListOfBanks = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get(`${baseUrl}/wallet/banks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(response.data);
        setBanks(response.data || []);
      } catch (error) {
        console.error("Failed to fetch bank list:", error);
      }
    };

    ListOfBanks();
  }, [accessToken]);

  const handleWithdraw = async () => {
    if (!selectedAccount || !accountNumber || !amount) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        `${baseUrl}/wallet/withdraw`,
        {
          bankCode: selectedAccount,
          bankName: selectedAccount,
          accountNo: accountNumber,
          accountName: beneficiaryName,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Response:", res.data);
      Alert.alert(
        "Withdrawal Successful",
        res?.data?.message || "Something went wrong"
      );
      router.push("/");
    } catch (error: any) {
      // console.error(
      //   "Error during withdrawal:",
      //   error.response?.data || error.message
      // );
      Alert.alert(
        "Withdrawal failed",
        error.response?.data?.message || "Something went wrong"
      );
    }
    setAccountNumber("");
    setAmount("");
    setBeneficiaryName("");
    setSelectedAccount("");
    setModalVisible(false);
  };

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
            ₦ {balance}
          </Text>

          {balance === "0" ? (
            <DefaultButton
              onPress={() => setModalVisible(true)}
              text="Withdraw"
            />
          ) : (
            <DisabledButton text="Withdraw" />
          )}
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
                onValueChange={(itemValue: any) =>
                  setSelectedAccount(itemValue)
                }
                style={tailwind`text-white`}
              >
                <Picker.Item label="Select Account" value="" color="#bbb" />
                {banks.map((bank: any) => (
                  <Picker.Item
                    key={bank.id}
                    label={bank.name}
                    value={bank.code}
                    color="#000"
                  />
                ))}
              </Picker>
            </View>

            {/* Account Number Input */}
            <TextInput
              style={tailwind`bg-[#282C34] text-white rounded-lg px-4 py-3 mb-3`}
              placeholder="Enter Account Number"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={accountNumber}
              onChangeText={(value) => {
                if (/^\d*$/.test(value)) {
                  setAccountNumber(value);
                }
              }}
            />

            <Text
              style={tailwind`hidden ${
                beneficiaryName === beneficiaryName
                  ? "flex mb-3 text-green-500 text-center"
                  : ""
              }`}
            >
              {beneficiaryName}
            </Text>

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
            <DefaultButton onPress={handleWithdraw} text="Withdraw" />
          </View>
        </View>
      </Modal>
    </>
  );
};

// testing to see where the commits gets to

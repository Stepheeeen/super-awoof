import React, { ReactNode, useState } from "react";
import { Modal, View, Text, Button, StyleSheet, Pressable } from "react-native";
import { DefaultButton } from "./Button";
import tailwind from "twrnc";
import AntDesign from "@expo/vector-icons/AntDesign";

const ModalContainer = ({
  modalVisible,
  onClose,
  ButtonText,
  HeadText,
  SubText,
  handleClick,
  cancelText,
  ModalHeadText,
}: {
  modalVisible: any;
  onClose: any;
  ButtonText: any;
  HeadText: any;
  SubText: string;
  handleClick: any;
  cancelText: any;
  ModalHeadText: string;
}) => {
  return (
    <Pressable onPress={onClose} style={styles.container}>
      <Modal
        animationType="fade" // You can use "fade" or "none" for different effects
        transparent={true} // Makes the background transparent
        visible={modalVisible} // Controls the modal visibility
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Pressable
              onPress={onClose}
              style={tailwind`absolute top-4 right-4`}
            >
              <AntDesign name="close" size={24} color="white" />
            </Pressable>
            <View style={tailwind`w-full flex items-center justify-center`}>
              {ModalHeadText}
            </View>
            <View>
              <Text
                style={tailwind`text-white text-center text-[22px] font-semibold`}
              >
                {HeadText}
              </Text>
              <Text
                style={tailwind`text-white text-center text-[17px] my-3 font-light`}
              >
                {SubText}
              </Text>
            </View>
            <Pressable onPress={onClose}>{cancelText}</Pressable>
            <View style={tailwind`w-[95%] mt-4`}>
              <DefaultButton onPress={handleClick} text={ButtonText} />
            </View>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adds a semi-transparent background
  },
  modalView: {
    width: "89%",
    padding: 20,
    paddingVertical: 40,
    backgroundColor: "#191B21",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 70,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
});

export default ModalContainer;

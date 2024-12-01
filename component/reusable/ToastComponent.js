import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const ToastComponent = () => {
  return <Toast config={toastConfig} />;
};

// Custom Toast configuration
const toastConfig = {
  success: ({ text1, text2 }) => (
    <ToastView style={styles.success}>
      <Text style={styles.title}>{text1}</Text>
      <Text style={styles.message}>{text2}</Text>
    </ToastView>
  ),
  error: ({ text1, text2 }) => (
    <ToastView style={styles.error}>
      <Text style={styles.title}>{text1}</Text>
      <Text style={styles.message}>{text2}</Text>
    </ToastView>
  ),
};

// Wrapper for custom toast view styling
const ToastView = ({ children, style }) => (
  <View style={[styles.toastContainer, style]}>{children}</View>
);

const styles = StyleSheet.create({
  toastContainer: {
    padding: 5,
    margin: 11,
    width: '90%',
    borderRadius: 5,
  },
  success: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
  },
  error: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
  },
  title: {
    color: '#fff',
    fontWeight: '600', // Adjusted to a valid fontWeight value
  },
  message: {
    color: '#fff',
  },
});

export default ToastComponent;
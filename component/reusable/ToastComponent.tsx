import React, { useEffect } from "react";
import { View, Text, Animated } from "react-native";
import tailwind from "twrnc";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: any;
  type: ToastType;
  visible: boolean;
  duration?: number; // Duration for which the toast stays visible
  onClose: () => void;
}

const ToastContainer: React.FC<ToastProps> = ({
  message,
  type,
  visible,
  duration = 3000,
  onClose,
}) => {
  const fadeAnim = new Animated.Value(0); // Animation for fade-in and fade-out

  useEffect(() => {
    if (visible) {
      // Fade in the toast
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Automatically hide the toast after the duration
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onClose(); // Close the toast after fade-out
        });
      }, duration);

      return () => clearTimeout(timer); // Clear the timeout on unmount
    }
  }, [visible]);

  // Tailwind styles for different types of toasts
  const getToastStyle = () => {
    switch (type) {
      case "success":
        return tailwind`bg-green-500 border-l-4 border-green-700`;
      case "error":
        return tailwind`bg-red-500 border-l-4 border-red-700`;
      case "info":
      default:
        return tailwind`bg-blue-500 border-l-4 border-blue-700`;
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        tailwind`absolute bottom-5 left-5 right-5 px-4 py-3 rounded-lg shadow-lg`,
        getToastStyle(),
        { opacity: fadeAnim },
      ]}
    >
      <Text style={tailwind`text-white font-semibold text-lg`}>{message}</Text>
    </Animated.View>
  );
};

export default ToastContainer;
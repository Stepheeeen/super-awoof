// Spinner.js
import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import tw from 'twrnc'; // Import twrnc

const Spinner = ({ onFinish, timer }: {onFinish: any, timer:any}) => {
  const position = useRef(new Animated.Value(0)).current;

  const reset = () => {
    Animated.timing(position, {
      toValue: -1000, // Adjust based on sprite size
      duration: timer,
      useNativeDriver: true,
    }).start(() => {
      onFinish(Math.random()); // Simulate a result for now
    });
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <Animated.View
      style={[
        tw`w-32 h-64 bg-white overflow-hidden`,
        { transform: [{ translateY: position }] },
      ]}
    />
  );
};

export default Spinner;

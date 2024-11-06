import React, { useEffect, useRef } from 'react';
import { View, Animated, Text } from 'react-native';
import tw from 'twrnc';

const LoadingProgressBar = ({ progress }: {progress: any}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={tw`w-[80%] h-2 bg-gray-200 rounded-full overflow-hidden`}>
      <Animated.View
        style={[
          tw`h-full bg-green-500`,
          {
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};

export default LoadingProgressBar;
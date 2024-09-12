// components/Spinner.tsx

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Animated, Text, View, Easing } from 'react-native';
import tailwind from 'twrnc';

// Define types for the props
type SpinnerProps = {
  onFinish: (result: string) => void;
  timer: number;
};

// Define the ref type for the forwardRef
export type SpinnerHandle = {
  forceUpdateHandler: () => void;
};

const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍋', '⭐'];

const Spinner = forwardRef<SpinnerHandle, SpinnerProps>(({ onFinish, timer }, ref) => {
  const [position, setPosition] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const spinAnimation = useRef(new Animated.Value(0)).current;

  // Enhanced animation with easing
  useEffect(() => {
    if (spinning) {
      Animated.loop(
        Animated.timing(spinAnimation, {
          toValue: symbols.length * -64, // Moves upward by 64px for each symbol
          duration: timer,
          easing: Easing.bezier(0.22, 1, 0.36, 1), // Custom easing function for a smooth animation
          useNativeDriver: true,
        })
      ).start();

      // Use a timer to stop the animation
      const timerId = setTimeout(() => {
        finish();
      }, timer);

      // Cleanup the timer and animation on unmount or spinning state change
      return () => {
        clearTimeout(timerId);
        spinAnimation.stopAnimation(); // Immediately stop the animation
      };
    }
  }, [spinning, timer]);

  const finish = (): void => {
    spinAnimation.stopAnimation();
    setSpinning(false);
    const result = symbols[Math.floor(Math.random() * symbols.length)];
    onFinish(result);
  };

  useImperativeHandle(ref, () => ({
    forceUpdateHandler() {
      setSpinning(true);
    },
  }));

  // Update position based on animation value
  spinAnimation.addListener(({ value }) => {
    const newPosition = Math.floor(-value / 64) % symbols.length;
    setPosition(newPosition);
  });

  return (
    <Animated.View
      style={[
        tailwind`w-32 h-16 mx-1 justify-center items-center overflow-hidden bg-white`,
        { transform: [{ translateY: spinAnimation }] },
      ]}
    >
      <Text style={tailwind`text-6xl text-center`}>{symbols[position]}</Text>
    </Animated.View>
  );
});

export default Spinner;

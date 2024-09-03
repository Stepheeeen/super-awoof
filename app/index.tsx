// App.tsx or App.jsx (with TypeScript)
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import tw from 'twrnc';
import Spinner from '@/components/Spinner';

const RepeatButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={tw`absolute top-2.5 right-5`}>
    <Image
      source={{ uri: 'https://andyhoffman.codes/random-assets/img/slots/repeat.png' }}
      style={tw`w-12 h-12`}
    />
  </TouchableOpacity>
);

const WinningSound: React.FC = () => {
  const sound = useRef(new Audio.Sound());

  React.useEffect(() => {
    async function playSound() {
      try {
        await sound.current.loadAsync({
          uri: 'https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav',
        });
        await sound.current.playAsync();
      } catch (error) {
        console.error('Error playing sound', error);
      }
    }
    playSound();

    return () => {
      sound.current.unloadAsync();
    };
  }, []);

  return null;
};

const App: React.FC = () => {
  const [winner, setWinner] = useState<boolean | null>(null); // Corrected type for winner state
  const matches = useRef<number[]>([]); // Set the type of the matches array to number

  const handleClick = () => {
    setWinner(null);
    matches.current = [];
  };

  const finishHandler = (value: number) => { // Define value type as number
    matches.current.push(value); // Now matches.current can accept numbers
    if (matches.current.length === 3) {
      const first = matches.current[0];
      const results = matches.current.every((match) => match === first);
      setWinner(results); // No error because results is a boolean
    }
  };

  const getLoserMessage = () => {
    const loserMessages = [
      'Not quite',
      'Stop gambling',
      'Hey, you lost!',
      'Ouch! I felt that',
      "Don't beat yourself up",
      'There goes the college fund',
      'I have a cat. You have a loss',
      "You're awesome at losing",
      'Coding is hard',
      "Don't hate the coder",
    ];
    return loserMessages[Math.floor(Math.random() * loserMessages.length)];
  };

  return (
    <View style={tw`flex-1 bg-[#292929] justify-center items-center`}>
      {winner ? <WinningSound /> : null}
      <Text style={tw`text-xl text-aliceblue border border-hsla-208-100-97-1-0.1 p-4 text-center`}>
        {winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoserMessage()}
      </Text>
      <View style={tw`flex-row overflow-hidden h-64 justify-center items-center`}>
        <Spinner onFinish={finishHandler} timer={1000} />
        <Spinner onFinish={finishHandler} timer={1400} />
        <Spinner onFinish={finishHandler} timer={2200} />
      </View>
      {winner !== null && <RepeatButton onPress={handleClick} />}
    </View>
  );
};

export default App;

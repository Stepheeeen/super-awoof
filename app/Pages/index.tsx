// import { DefaultButton } from '@/component/reusable/Button';
// import Spinner from '@/component/reusable/Spinner';
// import TabBar from '@/component/reusable/TabBar'
// import React, { useRef, useState, RefObject } from 'react';
// import { Image, ImageBackground, Pressable, Text, TouchableOpacity, View } from 'react-native'
// import Sound from 'react-native-sound';
// import tailwind from 'twrnc'

// type FinishHandler = (value: string) => void;

// // Preload the winning sound
// const winningSound = new Sound('https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav', undefined, (error) => {
//   if (error) {
//     console.log('Failed to load the sound', error);
//     return;
//   }
// });
// const index = () => {
//   const [winner, setWinner] = useState<boolean | null>(null);
//   const [soundOn, setSoundOn] = useState<boolean>(true);
//   const spinnerRefs: RefObject<any>[] = [useRef(), useRef(), useRef()]; // References to the spinner components
//   const matches = useRef<string[]>([]); // Keep track of matches

//   const handleClick = (): void => {
//     setWinner(null);
//     matches.current = [];
//     spinnerRefs.forEach((ref) => ref.current?.forceUpdateHandler());
//   };

//   const finishHandler: FinishHandler = (value) => {
//     matches.current.push(value);
//     if (matches.current.length === 3) {
//       const isWinner = matches.current.every((match) => match === matches.current[0]);
//       setWinner(isWinner);
//       if (isWinner && soundOn) {
//         winningSound.play();
//       }
//     }
//   };

//   const toggleSound = (): void => {
//     setSoundOn(!soundOn);
//     if (!soundOn) {
//       winningSound.play();
//     } else {
//       winningSound.stop();
//     }
//   };

//   const loserMessages: string[] = [
//     'Not quite', 'Stop gambling', 'Hey, you lost!',
//     'Ouch! I felt that', 'Don\'t beat yourself up',
//     'There goes the college fund', 'I have a cat. You have a loss',
//     'You\'re awesome at losing', 'Coding is hard', 'Don\'t hate the coder'
//   ];

//   const getLoserMessage = (): string => loserMessages[Math.floor(Math.random() * loserMessages.length)];

//   // Array of slot items
//   const slotItems = [
//     require('../../assets/images/taco.png'),  // Add path to the image
//     require('../../assets/images/gem.png'),   // Add path to the image
//     require('../../assets/images/money.png'), // Add path to the image
//     require('../../assets/images/heart.png'), // Add path to the image
//     require('../../assets/images/seven.png'), // Add path to the image
//     require('../../assets/images/fish.png'),  // Add path to the image
//     require('../../assets/images/chest.png'), // Add path to the image
//     require('../../assets/images/lock.png'),  // Add path to the image
//     require('../../assets/images/space.png')  // Add path to the image
//   ];

//   const [slots, setSlots] = useState([0, 0, 0]); // Initial state for slots

//   const handleSpin = () => {
//     // Randomly select 3 items for slots
//     setSlots(slots.map(() => Math.floor(Math.random() * slotItems.length)));
//   };
//   return (
//     <View style={tailwind`h-full bg-[#0F1219] w-full`}>
//       <View style={tailwind`flex flex-row items-center w-full justify-between px-4 pt-6 h-[10%] absolute top-0`}>
//         <Image source={require('../../assets/images/favicon.png')} style={tailwind`w-[50px] h-[50px]`} />

//         <Pressable style={tailwind`flex flex-row items-center bg-[#20232A] py-[2px] px-2 rounded`}>
//           <Image source={require('../../assets/images/AwoofCoin.png')} style={tailwind``} />
//           <Text style={tailwind`text-white text-[17px] mb-1 ml-1`}>
//             6000
//           </Text>
//         </Pressable>
//       </View>

//       <View style={tailwind`mt-[22%] w-full`}>
//         <View style={tailwind`w-full flex items-center justify-center relative h-[430px]`}>

//           <View style={tailwind`w-[90%] relative h-[417px]`}>
//             <Image source={require('../../assets/images/Slot_Bg.png')} style={tailwind`w-full h-full`} />

//             <View style={tailwind`absolute top-0 w-full h-full left-0 p-5 flex-row`}>
//               <View style={tailwind`flex-1 bg-[#292929] justify-center items-center`}>
//                 <Text style={tailwind`text-white text-lg mb-5 text-center`}>
//                   {winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoserMessage()}
//                 </Text>
//                 <View style={tailwind`flex-row justify-center items-center`}>
//                   {spinnerRefs.map((ref, index) => (
//                     <Spinner key={index} ref={ref} onFinish={finishHandler} timer={1000 + index * 400} />
//                   ))}
//                 </View>
//                 {winner !== null && <DefaultButton text='Replay' onPress={handleClick} />}
//                 <TouchableOpacity style={tailwind`absolute top-5 left-5`} onPress={toggleSound}>
//                   <Text style={tailwind`text-white`}>{soundOn ? '🔊' : '🔇'}</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>

//           <TouchableOpacity onPress={handleSpin} style={tailwind`mt-5 p-4 bg-yellow-500 rounded-lg`}>
//             <Text style={tailwind`text-white font-bold`}>Spin</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <TabBar />
//     </View>
//   )
// }

// export default index

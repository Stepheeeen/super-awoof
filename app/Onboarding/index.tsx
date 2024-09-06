import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DefaultButton } from "@/component/reusable/Button";
import { useRouter } from "expo-router";

const Onboarding = () => {
    const router = useRouter()
    return(
        <ScrollView 
        horizontal 
        pagingEnabled // Makes each screen take up the full width
        showsHorizontalScrollIndicator={false} // Hides the scroll bar
      >
        {/* First Screen */}
        <View style={styles.screen}>
          <Image source={require('../../assets/images/slot_machine.png')} style={styles.image} />
          <Text style={styles.heading}>Win Big with Super Awoof</Text>
          <Text style={styles.description}>Spin the reels and stand a chance to hit the jackpot! Every play gives you a shot at earning more, with easy coin purchases and rewards</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
  
        {/* Second Screen */}
        <View style={styles.screen}>
          <Image source={require('../../assets/images/coins.png')} style={styles.image} />
          <Text style={styles.heading}>Easy to Play, Big Rewards</Text>
          <Text style={styles.description}>Deposit as little as N1000 to get 400 coins and start spinning. Get ready for thrilling gameplay and cash rewards</Text>
            <DefaultButton onPress={()=>{router.push('/')}} text="Continue"/>
        </View>
  
        
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    screen: {
        height: '100%',
    },
    image: {},
    heading: {},
    description: {},
    button:{
        
    },
    buttonText:{},
  });

export default Onboarding;
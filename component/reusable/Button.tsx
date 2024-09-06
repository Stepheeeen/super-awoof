import React from 'react';
import { Pressable, StyleSheet, Text, View, } from 'react-native';



const DefaultButton = ({ text, onPress }: { text: string, onPress: any, }) => {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
                <View style={styles.darkGreenLine} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        minWidth: 150,
        height: 55,
        borderWidth: 4,
        borderColor: '#00A859',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2B603A',
        position: 'relative',
        overflow: 'hidden',
    },
    darkGreenLine: {
        width: '99%',
        height: '30%',
        backgroundColor: '#2F7654',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        position: 'absolute',
        opacity: .5,
        bottom: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 23,
        fontWeight: '500',
        zIndex: 9,
    },
});

export { DefaultButton };

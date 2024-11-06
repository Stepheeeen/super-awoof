import React from 'react';
import {  Pressable, StyleSheet, Text, View } from 'react-native';

const DisabledButton = ({ text}: { text: string}) => {

    return (
        <Pressable disabled={true}>
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
        borderColor: 'grey',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        position: 'relative',
        overflow: 'hidden',
    },
    darkGreenLine: {
        width: '99%',
        height: '30%',
        backgroundColor: 'darkgrey',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        position: 'absolute',
        opacity: 0.5,
        bottom: 4,
    },
    buttonText: {
        color: 'grey',
        fontSize: 23,
        fontWeight: '500',
        zIndex: 9,
    },
});

export { DisabledButton };
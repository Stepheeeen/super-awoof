import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import tailwind from 'twrnc';

const DefaultButton = ({ text, onPress }: { text: string, onPress: () => Promise<void> }) => {
    const [loading, setLoading] = useState(false);

    const handlePress = async () => {
        setLoading(true); // Set loading to true when button is pressed
        await onPress();   // Execute the onPress function
        setLoading(false); // Set loading back to false after function execution
    };

    return (
        <Pressable onPress={handlePress} disabled={loading}>
            <View style={styles.button}>
                {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                    <Text style={styles.buttonText}>{text}</Text>
                )}
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
        opacity: 0.5,
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
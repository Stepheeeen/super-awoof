import { router, usePathname } from 'expo-router'
import { Image, Pressable, Text, View, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import tailwind from 'twrnc'

const TabBar = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    if (isKeyboardVisible) return null; // Hide tab bar when keyboard is visible

    // Import or require your icons statically
    const ProfileActiveIcon = require('../../assets/images/profileActiveIcon.png');
    const ProfileNotActiveIcon = require('../../assets/images/profileNotActiveIcon.png');
    const HomeActiveIcon = require('../../assets/images/homeActiveIcon.png');
    const HomeNotActiveIcon = require('../../assets/images/homeNotActiveIcon.png');
    const HelpActiveIcon = require('../../assets/images/helpActiveIcon.png');
    const HelpNotActiveIcon = require('../../assets/images/helpNotActiveIcon.png');

    const Navbar = [
        { path: '/Pages', pagename: 'Home', ActiveIcon: HomeActiveIcon, NotActiveIcon: HomeNotActiveIcon, onPress: () => router.push('/Pages/'), },
        { path: '/Pages/Help', pagename: 'Help', ActiveIcon: HelpActiveIcon, NotActiveIcon: HelpNotActiveIcon, onPress: () => router.push('/Pages/Help/'), },
        { path: '/Pages/Profile', pagename: 'Profile', ActiveIcon: ProfileActiveIcon, NotActiveIcon: ProfileNotActiveIcon, onPress: () => router.push('/Pages/Profile/'), },
    ]

    return (
        <View style={tailwind`w-full h-[11%] absolute bottom-0 left-0 bg-[#12151D] border border-t-[#323232] flex flex-row justify-between items-center px-10`}>
            {Navbar.map((links, i) => {
                const iconSource = pathname === links.path ? links.ActiveIcon : links.NotActiveIcon;

                return (
                    <Pressable key={i} onPress={links.onPress}>
                        <View style={tailwind`flex items-center justify-center`}>
                            <Image source={iconSource} style={tailwind`w-7 mb-2`} />
                            <Text style={tailwind`${pathname === links.path ? 'text-[#00A859]' : 'text-[#A8A8A8]'}`} key={i}>{links.pagename}</Text>
                        </View>
                    </Pressable>
                )
            })}
        </View>
    )
}

export default TabBar
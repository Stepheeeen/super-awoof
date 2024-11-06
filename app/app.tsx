import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import ToastManager, { Toast } from 'toastify-react-native'

const App = () => {

  return (
    <View style={styles.container}>
      <ToastManager />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
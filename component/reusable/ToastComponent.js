// // ToastComponent.tsx
// import React, { useEffect, useRef } from 'react';
// import Toast from 'react-native-toast-message';

// const ToastComponent = () => {
//   const ref = useRef()
//   return <Toast ref={(ref) => Toast.setRef(ref)} />;
// };

// export default ToastComponent;

// ToastComponent.tsx
import React, {useRef} from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

const ToastComponent = () => {
  const ref = useRef()

  return <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} />;
};

// Custom Toast configuration
const toastConfig = {
  success: ({ text1, text2 }) => (
    <ToastView style={{ backgroundColor: '#28a745', paddingVertical: 15, borderRadius: 5 }}>
      <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 5}}>{text1}</Text>
      <Text style={{ color: '#fff' }}>{text2}</Text>
    </ToastView>
  ),
  error: ({ text1, text2 }) => (
    <ToastView style={{ backgroundColor: '#dc3545', paddingVertical: 15, borderRadius: 5 }}>
      <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 5}}>{text1}</Text>
      <Text style={{ color: '#fff' }}>{text2}</Text>
    </ToastView>
  ),
  // Add more custom types if needed
};

const ToastView = ({ children, style }) => (
  <View style={[{ padding: 10, margin: 11, width: '90%' }, style]}>{children}</View>
);

export default ToastComponent;

import React from 'react';
import AuthScreen from './screens/AuthScreen';  
import Toast from 'react-native-toast-message';  

export default function Index() {
  return (
    <>
      <AuthScreen />  
      <Toast />  
    </>
  );
}

import React from 'react';
import AuthScreen from './screens/AuthScreen';  
import Toast from 'react-native-toast-message';
import {UserProvider} from './components/UserContext';  

export default function Index() {
  return (
    <UserProvider>
      <AuthScreen />  
      <Toast />  
    </UserProvider>
  );
}

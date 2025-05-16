import React from 'react';
import AuthScreen from './screens/AuthScreen';  
import Toast from 'react-native-toast-message';
import {UserProvider} from './components/UserContext';  
import {ReservaProvider} from './components/ReservaContext';

export default function Index() {
  return (
    <UserProvider>
      <ReservaProvider>
      <AuthScreen />  
      <Toast />  
      </ReservaProvider>
    </UserProvider>
  );
}

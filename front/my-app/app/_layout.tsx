// app/_layout.tsx
import { Stack } from 'expo-router'; 
import { UserProvider } from './components/UserContext';
import { ReservaProvider } from './components/ReservaContext';


export default function Layout() {
  return (
    <UserProvider>
      <ReservaProvider>
    <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(tabs)"   />
    </Stack>
    </ReservaProvider>
    </UserProvider>
  );
}

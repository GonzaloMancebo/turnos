// app/_layout.tsx
import { Stack } from 'expo-router'; 
import { UserProvider } from './components/UserContext';


export default function Layout() {
  return (
    <UserProvider>
    <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(tabs)"   />
    </Stack>
    </UserProvider>
  );
}

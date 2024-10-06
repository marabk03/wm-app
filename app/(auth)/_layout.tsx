import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Layout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default Layout;

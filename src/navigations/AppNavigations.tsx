import { AuthStack } from './AuthStack';
import { AppTabs } from './AppTabs';
import { useAuth } from '@context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '@screens';

const Stack = createNativeStackNavigator();

export const AppNavigations: React.FC = () => {
  const { userData } = useAuth();
  const { isSplashScreenLoading } = useAuth()

  if (isSplashScreenLoading) return <SplashScreen />

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      {userData ? (
        <Stack.Screen name="AppTabs" component={AppTabs} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

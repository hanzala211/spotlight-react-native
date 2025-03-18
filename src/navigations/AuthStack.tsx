import {ROUTES} from '@constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, SignUpScreen} from '@screens';

const {Navigator, Screen} = createNativeStackNavigator();

export const AuthStack: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen
        options={{
          headerShown: false,
        }}
        name={ROUTES.login}
        component={LoginScreen}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={ROUTES.signup}
        component={SignUpScreen}
      />
    </Navigator>
  );
};

export default AuthStack;

import { Input, Heading, Icon } from '@components';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, ROUTES } from '@constants';
import { useAuth } from '@context';
import { useForm, Controller } from 'react-hook-form';
import { loginFormSchema, LoginFormSchema } from '@types';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginScreen: React.FC = () => {
  const { setAuthErrorMessage, login, authErrorMessage, isAuthLoading } =
    useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });
  const navigation = useNavigation();

  const onSubmit = (data: LoginFormSchema) => {
    console.log(data);
    login(data);
  };

  const handleNavigate = () => {
    setAuthErrorMessage('');
    navigation.navigate(ROUTES.signup);
  };

  return (
    <View className="flex-1 px-5 bg-bgPrimary items-center justify-center gap-5 w-full">
      <Icon />
      <Heading heading="s p o t l i g h t" />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors.email?.message}
            label="Email"
            placeholder="Email"
            keyboardType="email-address"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors.password?.message}
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            keyboardType="default"
          />
        )}
      />
      {!isAuthLoading ? (
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-white w-full p-3 flex rounded-lg items-center h-fit">
          <Text className="text-bgPrimary">Log In</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="large" color={COLORS.textPrimary} />
      )}
      <Text className="text-textGray" onPress={handleNavigate}>
        Sign Up
      </Text>
      {authErrorMessage.length > 0 && (
        <Text className="text-red-500 text-[17px]">{authErrorMessage}</Text>
      )}
    </View>
  );
};

export default LoginScreen;

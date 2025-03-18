import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Heading, Icon, Input } from '@components';
import { COLORS, ROUTES } from '@constants';
import { useAuth } from '@context';
import { useForm, Controller } from 'react-hook-form';
import { signupFormSchema, SignupFormSchema } from '@types';
import { zodResolver } from '@hookform/resolvers/zod';

export const SignUpScreen: React.FC = () => {
  const { signup, authErrorMessage, setAuthErrorMessage, isAuthLoading } =
    useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
  });
  const navigation = useNavigation();

  const onSubmit = (data: SignupFormSchema) => {
    signup(data);
  };

  const handleNavigate = () => {
    setAuthErrorMessage('');
    navigation.navigate(ROUTES.login);
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
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors.name?.message}
            label="Name"
            placeholder="Name"
            keyboardType="default"
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
          <Text className="text-bgPrimary">Sign Up</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="large" color={COLORS.textPrimary} />
      )}
      <Text className="text-textGray">If you already have an account.</Text>
      <Text className="text-textGray" onPress={handleNavigate}>
        Log In
      </Text>
      {authErrorMessage.length > 0 && (
        <Text className="text-red-500 text-[17px]">{authErrorMessage}</Text>
      )}
    </View>
  );
};

export default SignUpScreen;

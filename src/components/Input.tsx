import { Text, TextInput, View } from 'react-native';

interface InputProps {
  label?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  className?: string;
  error?: string;
  value?: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  max?: number
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  className,
  error,
  value,
  onChangeText,
  onBlur,
  max
}) => {
  return (
    <View className={`w-full gap-3`}>
      {label && (
        <Text className="text-textGray font-JetBrainsMonoExtraLightItalic text-[20px]">
          {label}
        </Text>
      )}
      <TextInput
        keyboardType={keyboardType}
        className={`bg-['#1a1a1a'] w-full text-white placeholder:text-textGray px-4  ${className ? className : 'rounded-lg text-[17px]'
          }`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        maxLength={max}
      />
      {error && <Text className="text-red-500 text-[17px]">{error}</Text>}
    </View>
  );
};

export default Input;

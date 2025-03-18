import { View } from "react-native"
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from "@constants";

export const Icon: React.FC = () => {
  return <View className="bg-green-950 p-4 rounded-2xl">
    <Ionicons name="leaf" color={COLORS.textPrimary} size={54} />
  </View>
}

export default Icon
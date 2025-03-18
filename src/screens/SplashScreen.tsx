import { Icon } from "@components"
import { COLORS } from "@constants"
import { ActivityIndicator, View } from "react-native"

export const SplashScreen: React.FC = () => {

  return <View className="flex-1 bg-black items-center justify-center gap-5">
    <Icon />
    <ActivityIndicator size="large" color={COLORS.textPrimary} />
  </View>
}

export default SplashScreen
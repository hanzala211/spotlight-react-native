import { ROUTES } from "@constants"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { BookmarkScreen, PostScreen } from "@screens"

const Stack = createNativeStackNavigator()

export const BookmarkStack: React.FC = () => {
  return <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name={ROUTES.bookmark} component={BookmarkScreen} />
    <Stack.Screen name={ROUTES.post} component={PostScreen} />
  </Stack.Navigator>
}
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css"
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, PostProvider, ReactQueryClientProvider } from "@context";
import { AppNavigations } from "@navigations";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView className="flex-1">
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-bgPrimary">
              <ReactQueryClientProvider>
                <AuthProvider>
                  <PostProvider>
                    <AppNavigations />
                  </PostProvider>
                </AuthProvider>
              </ReactQueryClientProvider>
            </SafeAreaView>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}


export default App;
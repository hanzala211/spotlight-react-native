import { COLORS, ROUTES } from '@constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BookmarkScreen,
  CreatePostScreen,
  FeedScreen,
  ProfileScreen,
} from '@screens';
import Ionicons from '@react-native-vector-icons/ionicons';
import { StyleSheet } from 'react-native';
import { BookmarkStack } from './BookmarkTabs';

const Tabs = createBottomTabNavigator();

export const AppTabs: React.FC = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.textPrimary,
        tabBarInactiveTintColor: COLORS.textGray,
        headerShown: false,
        tabBarStyle: styles.tabs,
      }}>
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
        name={ROUTES.feed}
        component={FeedScreen}
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
        name={ROUTES.bookmark}
        component={BookmarkStack}
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
        name={ROUTES.create}
        component={CreatePostScreen}
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
        name={ROUTES.profile}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: COLORS.bgPrimary,
    borderTopWidth: 0,
    position: 'static',
    bottom: 0,
    elevation: 0,
    height: 40,
    paddingBottom: 0,
  },
});

export default AppTabs;

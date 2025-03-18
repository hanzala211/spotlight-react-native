import { Heading, Post } from '@components';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS, USERS, width } from '@constants';
import { useAuth, usePost } from '@context';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';

export const FeedScreen: React.FC = () => {
  const { setUserData } = useAuth();
  const { getFeedPosts } = usePost()
  const { data: posts } = useQuery({
    queryFn: getFeedPosts,
    queryKey: ['feedPosts'],
  });

  const logout = async () => {
    setUserData(null);
    await AsyncStorage.removeItem('token');
  };

  const renderItem = ({ item }: { item: { name: string } }) => (
    <View className="items-center gap-2">
      <View className="p-2 border-[1px] border-textPrimary gap-2 rounded-full">
        <Image
          source={require('../assets/images/testUser.png')}
          className="w-20 h-20 rounded-full"
        />
      </View>
      <Text className="text-textWhite">{item.name}</Text>
    </View>
  );

  return (
    <View className="bg-bgPrimary flex-1 py-2 px-1 w-full">
      <View className="justify-between border-b-[2px] border-bgGray pb-4 flex-row items-baseline">
        <Heading heading="spotlight" />
        <TouchableOpacity onPress={logout}>
          <Ionicons name="exit-outline" size={24} color={COLORS.textWhite} />
        </TouchableOpacity>
      </View>
      <ScrollView className='gap-4'>
        <View className="mt-4 border-b-[2px] border-bgGray pb-4">
          <FlatList
            data={USERS}
            horizontal
            keyExtractor={item => item.name}
            pagingEnabled
            snapToInterval={width}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          />
        </View>
        {posts?.map((item, index) => (
          <Post key={index} post={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeedScreen;

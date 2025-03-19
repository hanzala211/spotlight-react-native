import { Heading, Post, PostLoader } from '@components';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS, USERS, width } from '@constants';
import { useAuth, usePost } from '@context';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IPost } from '@types';

export const FeedScreen: React.FC = () => {
  const { setUserData } = useAuth();
  const { getFeedPosts } = usePost();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const {
    data: posts,
    refetch,
    isLoading: isPostsLoading,
  } = useQuery({
    queryFn: getFeedPosts,
    queryKey: ['feedPosts'],
  });
  const getPostMutation = useMutation({
    mutationFn: getFeedPosts,
    onSuccess: data => {
      queryClient.setQueryData<IPost[]>(['feedPosts'], oldData => {
        if (!oldData) return data || [];
        const newPosts =
          data?.filter(newItem =>
            oldData.every(oldItem => oldItem._id !== newItem._id),
          ) || [];
        return [...oldData, ...newPosts];
      });
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const logout = async () => {
    setUserData(null);
    await AsyncStorage.removeItem('token');
  };

  const handleScroll = ({
    nativeEvent,
  }: {
    nativeEvent: {
      layoutMeasurement: { height: number };
      contentOffset: { y: number };
      contentSize: { height: number };
    };
  }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      getPostMutation.mutate();
    }
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
      <ScrollView
        scrollEventThrottle={16}
        onScroll={handleScroll}
        className="gap-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.textGray}
          />
        }>
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
        {!isPostsLoading
          ? posts?.map((item, index) => <Post key={index} post={item} />)
          : Array(3)
            .fill(null)
            .map((_, index) => (
              <View key={index} className="mb-4">
                <PostLoader />
              </View>
            ))}
        {getPostMutation.isPending && (
          <ActivityIndicator color={COLORS.textPrimary} size={32} />
        )}
      </ScrollView>
    </View>
  );
};

export default FeedScreen;

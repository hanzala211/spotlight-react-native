import { Heading } from '@components';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ROUTES } from '@constants';
import { usePost } from '@context';
import { useQuery } from '@tanstack/react-query';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type RootStackParamList = {
  [ROUTES.post]: { selectedIndex: number };
};

export const BookmarkScreen: React.FC = () => {
  const { getSavedPosts } = usePost();
  const { data: savedPosts, isLoading } = useQuery({
    queryFn: getSavedPosts,
    queryKey: ['savedPosts'],
  });
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View className="flex-1 bg-bgPrimary p-1 w-full">
      <View className="pb-5 border-b-[1px] border-bgGray">
        <Heading heading="Bookmarks" />
      </View>
      <ScrollView>
        <View className="flex-1 flex-row flex-wrap gap-2 mt-4 justify-between">
          {isLoading
            ? Array(3)
              .fill(null)
              .map((_, index) => (
                <View key={index} className='w-[32%] mb-[16px]'>
                  <SkeletonPlaceholder>
                    <SkeletonPlaceholder.Item
                      width="100%"
                      height={160}
                      borderRadius={8}
                    />
                  </SkeletonPlaceholder>
                </View>
              ))
            : savedPosts &&
            savedPosts.length > 0 &&
            savedPosts.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate(ROUTES.post, { selectedIndex: index })
                }
                className='w-[32%]'
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  className='w-full h-[160px] rounded-md'
                />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>

    </View>
  );
};

export default BookmarkScreen;

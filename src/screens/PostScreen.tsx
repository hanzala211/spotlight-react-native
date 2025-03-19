import { COLORS } from "@constants"
import { usePost } from "@context"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { IPost } from "@types"
import { useEffect, useRef } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from "@react-navigation/native"
import { Post } from "@components"

type PostScreenProps = {
  route: {
    params: {
      selectedIndex: number
    }
  }
}

export const PostScreen: React.FC<PostScreenProps> = ({ route }) => {
  const { getSavedPosts } = usePost()
  const queryClient = useQueryClient()
  const { data: savedPostsData = [] } = useQuery<IPost[]>({
    queryFn: getSavedPosts,
    queryKey: ['savedPosts'],
    initialData: () => queryClient.getQueryData(['savedPosts']),
  });
  const flatListRef = useRef<FlatList<IPost>>(null)
  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ animated: false, index: route.params.selectedIndex });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [route.params.selectedIndex]);

  const renderItem = ({ item }: { item: IPost }) => {
    return <Post post={item} />
  }

  return <View className="bg-bgPrimary px-1 py-2 flex-1">
    <View className="border-b-[1px] border-bgGray pb-4">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" color={COLORS.textPrimary} size={30} />
      </TouchableOpacity>
    </View>
    <FlatList
      renderItem={renderItem}
      data={savedPostsData}
      keyExtractor={(item) => item._id}
      ref={flatListRef}
    />
  </View>
}

export default PostScreen
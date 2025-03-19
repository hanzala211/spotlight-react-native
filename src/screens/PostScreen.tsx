import { Heading, Post } from "@components"
import { useQueryClient } from "@tanstack/react-query"
import { IPost } from "@types"
import { useEffect, useRef } from "react"
import { FlatList, View } from "react-native"

type PostScreenProps = {
  route: {
    params: {
      selectedIndex: number
    }
  }
}

export const PostScreen: React.FC<PostScreenProps> = ({ route }) => {
  const queryClient = useQueryClient()
  const savedPostsData = queryClient.getQueryData<IPost[]>(["savedPosts"])
  const flatListRef = useRef<FlatList<IPost>>(null)

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
      <Heading heading="Post" />
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
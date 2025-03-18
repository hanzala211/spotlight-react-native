import { Heading, Post } from "@components"
import { ScrollView, View } from "react-native"

export const PostScreen: React.FC = () => {
  return <View className="bg-bgPrimary px-1 py-2 flex-1">
    <View className="border-b-[1px] border-bgGray pb-4">
      <Heading heading="Post" />
    </View>
    <ScrollView>
      <Post />
    </ScrollView>
  </View>
}

export default PostScreen
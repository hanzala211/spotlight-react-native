import { formatDate } from "@helpers"
import { IUser } from "@types"
import { Image, Text } from "react-native"
import { View } from "react-native"

export const Comments: React.FC<{ comment: { comment: string, createdAt: string, commentBy: IUser } }> = ({ comment }) => {
  return <View className='flex-row gap-4 p-4 border-b-[1px] border-temporaryGray'>
    <Image
      source={require('../assets/images/testUser.png')}
      className="w-14 rounded-full h-14"
    />
    <View>
      <Text className='text-textWhite font-medium text-[15px]'>{comment.commentBy.name}</Text>
      <Text className='text-textWhite text-[14px]'>{comment.comment}</Text>
      <Text className='text-textGray text-[12px]'>{formatDate(comment.createdAt)}</Text>
    </View>
  </View>
}

export default Comments
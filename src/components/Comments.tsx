import { Image, Text } from "react-native"
import { View } from "react-native"

export const Comments: React.FC = () => {
  return <View className='flex-row gap-4 p-4 border-b-[1px] border-temporaryGray'>
    <Image
      source={require('../assets/images/testUser.png')}
      className="w-14 rounded-full h-14"
    />
    <View>
      <Text className='text-textWhite font-medium text-[15px]'>Name</Text>
      <Text className='text-textWhite text-[14px]'>comment</Text>
      <Text className='text-textGray text-[12px]'>time</Text>
    </View>
  </View>
}

export default Comments
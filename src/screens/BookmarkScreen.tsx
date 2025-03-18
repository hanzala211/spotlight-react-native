import { Heading } from '@components';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@constants';


export const BookmarkScreen: React.FC = () => {
  const navigation = useNavigation()
  return (
    <View className='flex-1 bg-bgPrimary p-2 w-full'>
      <View className='pb-5 border-b-[1px] border-bgGray'>
        <Heading heading='Bookmarks' />
      </View>
      <ScrollView>
        <View className='flex-1 flex-row flex-wrap mt-4 gap-2'>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.post)}>
            <Image source={require("../assets/images/testUser.png")} className='w-40 h-40 rounded-md' />
          </TouchableOpacity>
          <Image source={require("../assets/images/testUser.png")} className='w-40 h-40 rounded-md' />
          <Image source={require("../assets/images/testUser.png")} className='w-40 h-40 rounded-md' />
        </View>
      </ScrollView>
    </View>
  );
};

export default BookmarkScreen;

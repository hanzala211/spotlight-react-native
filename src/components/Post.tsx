import { COLORS } from '@constants';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { commentFormSchema, CommentFormSchema, IPost } from '@types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Comments, Input } from '@components';
import { useAuth } from '@context';
import { formatDate } from '@helpers';

export const Post: React.FC<{ post: IPost }> = ({ post }) => {
  const { userData } = useAuth()
  const sheetRef = useRef<BottomSheetModal>(null);
  const { control, handleSubmit, watch } = useForm<CommentFormSchema>({
    resolver: zodResolver(commentFormSchema),
  });

  const onSubmit = (data: CommentFormSchema) => {
    console.log(data);
  };

  return (
    <View className="gap-2">
      <View className="items-center mt-4 mb-2 px-2 flex-row justify-between">
        <View className="flex-row gap-4 items-center">
          <Image
            source={require('../assets/images/testUser.png')}
            className="w-12 h-12 rounded-full"
          />
          <Text className="text-textWhite">{post.postBy?.name}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-horizontal-sharp"
            color={COLORS.textWhite}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: post.imageUrl }}
        className="w-full rounded-md h-96 object-cover"
      />
      <View className="gap-2 px-4">
        <View className="flex-row justify-between items-baseline">
          <View className="flex-row gap-5 items-baseline">
            <TouchableOpacity>
              {!post.likes.includes(userData?._id || "") ?
                <Ionicons
                  name="heart-outline"
                  color={COLORS.textWhite}
                  size={25}
                />
                :
                <Ionicons
                  name="heart"
                  color={COLORS.textPrimary}
                  size={25}
                />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sheetRef.current?.present()}>
              <Ionicons name="chatbubble-ellipses-outline" color={COLORS.textWhite} size={24} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="bookmark-outline"
              color={COLORS.textWhite}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-textWhite text-[17px]">{post.likesCount} likes</Text>
        <Text className="text-textGray text-[16px]">{post.caption}</Text>
        <Text className="text-textGray text-[14px]">about {formatDate(post.createdAt)}</Text>
      </View>

      <View className="flex-1">
        <BottomSheetModal
          ref={sheetRef}
          index={1}
          snapPoints={['50%', '93%']}
          enablePanDownToClose={true}
          handleStyle={{ backgroundColor: COLORS.bgPrimary }}
          handleIndicatorStyle={{ backgroundColor: COLORS.textGray }}>
          <BottomSheetView className="flex-1 bg-bgPrimary py-3 pb-14 px-1 gap-2">
            <Text className="text-textWhite font-semibold text-[18px] border-b-[1px] border-temporaryGray w-full text-center pb-3">
              Comments
            </Text>
            <View className="flex-1">
              {/* <View className="items-center justify-center flex-1 gap-10">
                <Image
                  source={require('../assets/images/authBg.png')}
                  className="w-full rounded-md h-96 object-cover"
                />
                <Text className="text-textWhite text-[20px] font-semibold">
                  Add Comments...
                </Text>
              </View> */}
              <View>
                <Comments />
              </View>
            </View>
            <View className="p-4 flex-row items-center gap-5 w-[90%]">
              <Controller
                name="comment"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Add a comment..."
                    className="rounded-full"
                  />
                )}
              />
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className={`${watch("comment") && watch('comment').length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
                  }`}>
                <Text className="text-textPrimary">Post</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </View>
  );
};

export default Post;

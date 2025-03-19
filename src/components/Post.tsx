import { COLORS } from '@constants';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { commentFormSchema, CommentFormSchema, IPost, IUser } from '@types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Comments, Input } from '@components';
import { useAuth, usePost } from '@context';
import { formatDate } from '@helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const Post: React.FC<{ post: IPost }> = ({ post }) => {
  const { userData, setUserData } = useAuth();
  const {
    bookmarkPost,
    removeBookmarkPost,
    likePost,
    disLikePost,
    uploadComment,
  } = usePost();
  const queryClient = useQueryClient();
  const sheetRef = useRef<BottomSheetModal>(null);
  const { control, handleSubmit, watch, reset } = useForm<CommentFormSchema>({
    resolver: zodResolver(commentFormSchema),
  });


  const bookmarkSaveMutate = useMutation({
    mutationFn: (postId: string) => bookmarkPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedPosts'] });
      setUserData((prev: IUser | null) => {
        if (!prev) return prev;
        return {
          ...prev,
          bookmarkedPosts: [...(prev.bookmarkedPosts || []), post._id],
        };
      });
    },
  });

  const removeBookmarkSaveMutate = useMutation({
    mutationFn: (postId: string) => removeBookmarkPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedPosts'] });
      setUserData((prev: IUser | null) => {
        if (!prev) return prev;
        return {
          ...prev,
          bookmarkedPosts: prev.bookmarkedPosts.filter(item => item !== post._id),
        };
      });
    },
  });

  const likePostMutation = useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: (data, postId: string) => {
      queryClient.setQueryData(['savedPosts'], (oldData: any = []) => {
        const updatedPosts = oldData.map((post: any) => {
          if (post._id === postId) {
            console.log(post.likes.includes(userData?._id || ''))
            return {
              ...post,
              likesCount: post.likesCount + 1,
              likes: [...post.likes, userData?._id],
            };
          }
          return post;
        });
        console.log('Updated savedPosts:', updatedPosts);
        return updatedPosts;
      });
      queryClient.setQueryData(['feedPosts'], (oldData: any) =>
        oldData?.map((post: any) => {
          if (post._id === postId) {
            return {
              ...post,
              likesCount: post.likesCount + 1,
              likes: [...post.likes, userData?._id],
            };
          }
          return post;
        })
      );
    },
  });

  const dislikePostMutation = useMutation({
    mutationFn: (postId: string) => disLikePost(postId),
    onSuccess: (data, postId: string) => {
      queryClient.setQueryData(['feedPosts'], (oldData: any) =>
        oldData?.map((post: any) => {
          if (post._id === postId) {
            return {
              ...post,
              likesCount: post.likesCount - 1,
              likes: post.likes.filter((id: string) => id !== userData?._id),
            };
          }
          return post;
        })
      );
      queryClient.setQueryData(['savedPosts'], (oldData: any) =>
        oldData?.map((post: any) => {
          if (post._id === postId) {
            return {
              ...post,
              likesCount: post.likesCount - 1,
              likes: post.likes.filter((id: string) => id !== userData?._id),
            };
          }
          return post;
        })
      );
    },
  });

  const uploadCommentMutation = useMutation({
    mutationFn: (params: { postId: string; data: unknown }) =>
      uploadComment(params.postId, params.data),
    onSuccess: (data, params) => {
      reset();
      queryClient.setQueryData(['feedPosts'], (oldData: any) =>
        oldData?.map((post: any) => {
          if (post._id === params.postId) {
            return {
              ...post,
              comments: post.comments ? [...post.comments, params.data] : [params.data],
            };
          }
          return post;
        })
      );
      queryClient.setQueryData(['savedPosts'], (oldData: any) =>
        oldData?.map((post: any) => {
          if (post._id === params.postId) {
            return {
              ...post,
              comments: post.comments ? [...post.comments, params.data] : [params.data],
            };
          }
          return post;
        })
      );
    },
  });

  const onSubmit = (data: CommentFormSchema) => {
    console.log(data);
    uploadCommentMutation.mutate({
      postId: post._id,
      data: { ...data, commentBy: userData, createdAt: Date.now() },
    });
  };

  const handleSave = () => {
    if (!userData?.bookmarkedPosts.includes(post._id)) {
      bookmarkSaveMutate.mutate(post._id);
    } else {
      removeBookmarkSaveMutate.mutate(post._id);
    }
  };

  const handleLike = () => {
    if (!post.likes.includes(userData?._id || '')) {
      likePostMutation.mutate(post._id);
    } else {
      dislikePostMutation.mutate(post._id);
    }
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
            <TouchableOpacity onPress={handleLike}>
              {!post.likes.includes(userData?._id || '') ? (
                <Ionicons
                  name="heart-outline"
                  color={COLORS.textWhite}
                  size={25}
                />
              ) : (
                <Ionicons name="heart" color={COLORS.textPrimary} size={25} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sheetRef.current?.present()}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                color={COLORS.textWhite}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleSave}>
            {!userData?.bookmarkedPosts.includes(post._id) ? (
              <Ionicons
                name="bookmark-outline"
                color={COLORS.textWhite}
                size={25}
              />
            ) : (
              <Ionicons name="bookmark" color={COLORS.textPrimary} size={25} />
            )}
          </TouchableOpacity>
        </View>
        <Text className="text-textWhite text-[17px]">
          {post.likesCount} likes
        </Text>
        {post.caption.length !== 0 && (
          <Text className="text-textGray text-[16px]">{post.caption}</Text>
        )}
        <Text className="text-textGray text-[14px]">
          about {formatDate(post.createdAt)}
        </Text>
      </View>

      <View className="flex-1">
        <BottomSheetModal
          ref={sheetRef}
          index={1}
          snapPoints={['20%', '93%']}
          enablePanDownToClose={true}
          handleStyle={{ backgroundColor: COLORS.bgPrimary }}
          handleIndicatorStyle={{ backgroundColor: COLORS.textGray }}
        >
          <BottomSheetView className="flex-1 bg-bgPrimary py-3 pb-14 px-1 gap-2">
            <Text className="text-textWhite font-semibold text-[18px] border-b-[1px] border-temporaryGray w-full text-center pb-3">
              Comments
            </Text>
            <View className="flex-1">
              {post.comments.length === 0 ? (
                <View className="items-center justify-center flex-1 gap-10">
                  <Image
                    source={require('../assets/images/authBg.png')}
                    className="w-full rounded-md h-96 object-cover"
                  />
                  <Text className="text-textWhite text-[20px] font-semibold">
                    Add Comments...
                  </Text>
                </View>
              ) : (
                <ScrollView>
                  {post.comments.map((item, index) => (
                    <Comments key={index} comment={item} />
                  ))}
                </ScrollView>
              )}
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
                className={`${watch('comment') && watch('comment').length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
                  }`}
              >
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

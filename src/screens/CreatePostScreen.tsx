import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS, width } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { pick } from '@react-native-documents/picker';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@components';
import { captionFormSchema, CaptionFormSchema } from '@types';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePost } from '@context';
import { useMutation } from '@tanstack/react-query';

export const CreatePostScreen: React.FC = () => {
  const { file, setFile, addPost } = usePost();
  const { handleSubmit, control } = useForm<CaptionFormSchema>({
    resolver: zodResolver(captionFormSchema),
  });
  const addPostMutation = useMutation({
    mutationFn: (caption: string | undefined) => addPost(caption),
  });
  const navigation = useNavigation();

  const pickFile = async () => {
    try {
      const [selectedFile] = await pick({
        type: ['image/jpeg', 'image/png', 'image/jpg'],
        allowMultiSelection: false,
      });
      if (!selectedFile) return;
      setFile(selectedFile);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: CaptionFormSchema) => {
    console.log(data);
    addPostMutation.mutate(data?.caption ? data.caption : '');
  };

  return (
    <View className="bg-bgPrimary flex-1 px-1 py-2">
      <View className="border-b-[1px] border-bgGray">
        <View
          className="flex-row items-baseline justify-between pb-4 px-3"
          style={styles.header}>
          {!file ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" color={COLORS.textPrimary} size={30} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setFile(null)}>
              <Ionicons name="close" size={30} color={COLORS.textWhite} />
            </TouchableOpacity>
          )}
          <Text className="text-textWhite text-[20px] font-medium">
            New Post
          </Text>
          {file ? (
            <TouchableOpacity
              disabled={addPostMutation.isPending}
              onPress={handleSubmit(onSubmit)}>
              <Text
                className={`text-textPrimary text-[14px] font-medium ${addPostMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                  }`}>
                Share
              </Text>
            </TouchableOpacity>
          ) : (
            <Text className="pointer-events-none">Share</Text>
          )}
        </View>
      </View>
      {!file ? (
        <TouchableHighlight disabled={addPostMutation.isPending} onPress={pickFile} className="flex-1">
          <View className="flex-1 items-center justify-center gap-2">
            <Ionicons name="image-outline" color={COLORS.textGray} size={80} />
            <Text className="text-textGray">Tap to select an image</Text>
          </View>
        </TouchableHighlight>
      ) : (
        <View className="flex-1">
          <View className="relative">
            <Image
              source={{ uri: file?.uri }}
              className="w-full h-[30rem] object-cover"
            />
            <TouchableOpacity
              onPress={pickFile}
              className="flex-row gap-2 items-center absolute bg-bgPrimary p-2 rounded-md right-2 bottom-3">
              <Ionicons
                name="image-outline"
                color={COLORS.textWhite}
                size={24}
              />
              <Text className="text-textWhite">Change</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-4 items-center mt-4">
            <Image
              source={require('../assets/images/testUser.png')}
              className="w-14 h-14 rounded-full"
            />
            <Controller
              control={control}
              name="caption"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  max={30}
                  placeholder="Write a caption..."
                  className="rounded-full w-[82%]"
                />
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width * 1,
  },
});

export default CreatePostScreen;

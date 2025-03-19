import { DocumentPickerResponse } from '@react-native-documents/picker';
import { postServices } from '@services';
import { IPost } from '@types';
import { AxiosResponse } from 'axios';
import { createContext, useContext, useState } from 'react';
import { useNavigation } from "@react-navigation/native"
import { ROUTES } from '@constants';

interface PostContextTypes {
  file: DocumentPickerResponse | null,
  setFile: React.Dispatch<React.SetStateAction<DocumentPickerResponse | null>>,
  addPost: (caption: string | undefined) => Promise<AxiosResponse<any, any> | undefined>,
  getFeedPosts: () => Promise<IPost[] | undefined>,
  bookmarkPost: (postId: string) => Promise<string | undefined>,
  removeBookmarkPost: (postId: string) => Promise<string | undefined>,
  getSavedPosts: () => Promise<IPost[] | undefined>,
  likePost: (postId: string) => Promise<string | undefined>,
  disLikePost: (postId: string) => Promise<string | undefined>,
  uploadComment: (postId: string, data: unknown) => Promise<string | undefined>
}

const PostContext = createContext<PostContextTypes | undefined>(undefined);

type PostProviderProps = {
  children: React.ReactNode;
};

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [file, setFile] = useState<DocumentPickerResponse | null>(null);
  const navigation = useNavigation()

  const addPost = async (caption: string | undefined) => {
    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("caption", caption)
      const response = await postServices.addPost(formData)
      console.log(response)
      if (response.status === 200) {
        return response.data.post
      }
      return;
    } catch (error) {
      console.log(error)
    } finally {
      navigation.navigate(ROUTES.feed)
    }
  }

  const getFeedPosts = async () => {
    try {
      const response = await postServices.getFeedPost("3")
      console.log(response)
      if (response.status === 200) {
        return response.data.posts;
      }
      return;
    } catch (error) {
      console.log(error)
    }
  }

  const bookmarkPost = async (postId: string) => {
    try {
      console.log(postId)
      const response = await postServices.bookMarkPost(postId)
      console.log(response)
      if (response.status === 200) return response.data.message
      return
    } catch (error) {
      console.log(error)
    }
  }

  const removeBookmarkPost = async (postId: string) => {
    try {
      const response = await postServices.removeBookMarkPost(postId)
      console.log(response)
      if (response.status === 200) return response.data.message
      return
    } catch (error) {
      console.log(error)
    }
  }

  const getSavedPosts = async () => {
    try {
      const response = await postServices.getSavedPosts()
      console.log(response)
      if (response.status === 200) {
        return response.data.posts
      }
      return
    } catch (error) {
      console.log(error)
    }
  }

  const likePost = async (postId: string) => {
    try {
      const response = await postServices.likePost(postId)
      if (response.status === 200) {
        return response.data.message
      }
      return
    } catch (error) {
      console.log(error)
    }
  }

  const disLikePost = async (postId: string) => {
    try {
      const response = await postServices.disLikePost(postId)
      if (response.status === 200) {
        return response.data.message
      }
      return
    } catch (error) {
      console.log(error)
    }
  }

  const uploadComment = async (postId: string, data: unknown) => {
    try {
      const response = await postServices.uploadComment(postId, data)
      console.log(response)
      if (response.status === 200) {
        return response.data.message
      }
      return
    } catch (error) {
      console.log(error)
    }
  }

  return <PostContext.Provider value={{ file, setFile, addPost, getFeedPosts, bookmarkPost, removeBookmarkPost, getSavedPosts, likePost, disLikePost, uploadComment }}>{children}</PostContext.Provider>;
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('use usePost inside Post Provider');
  }
  return context;
};

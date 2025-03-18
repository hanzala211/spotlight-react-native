import { DocumentPickerResponse } from '@react-native-documents/picker';
import { postServices } from '@services';
import { IPost } from '@types';
import { AxiosResponse } from 'axios';
import { createContext, useContext, useState } from 'react';

interface PostContextTypes {
  file: DocumentPickerResponse | null,
  setFile: React.Dispatch<React.SetStateAction<DocumentPickerResponse | null>>,
  addPost: (caption: string | undefined) => Promise<AxiosResponse<any, any> | undefined>,
  getFeedPosts: () => Promise<IPost[] | undefined>
}

const PostContext = createContext<PostContextTypes | undefined>(undefined);

type PostProviderProps = {
  children: React.ReactNode;
};

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [file, setFile] = useState<DocumentPickerResponse | null>(null);

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
    }
  }

  const getFeedPosts = async () => {
    try {
      const response = await postServices.getFeedPost("5")
      console.log(response)
      if (response.status === 200) {
        return response.data.posts;
      }
      return;
    } catch (error) {
      console.log(error)
    }
  }

  return <PostContext.Provider value={{ file, setFile, addPost, getFeedPosts }}>{children}</PostContext.Provider>;
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('use usePost inside Post Provider');
  }
  return context;
};

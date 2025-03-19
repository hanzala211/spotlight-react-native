import { sendRequest } from "@helpers";

export const postServices = {
  addPost: (data: unknown) => sendRequest({
    isAuthIncluded: true,
    method: "POST",
    url: "/post",
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  getFeedPost: (limit: string) => sendRequest({
    isAuthIncluded: false,
    method: "GET",
    url: `/post/feed?limit=${limit}`,
  }),
  bookMarkPost: (postId: string) => sendRequest({
    isAuthIncluded: true,
    url: `/post/bookmark/save/${postId}`,
    method: "PUT"
  }),
  removeBookMarkPost: (postId: string) => sendRequest({
    isAuthIncluded: true,
    url: `/post/bookmark/unsave/${postId}`,
    method: "PUT"
  }),
  getSavedPosts: () => sendRequest({
    isAuthIncluded: true,
    url: `/post/bookmark`,
    method: "GET",
  }),
  likePost: (postId: string) => sendRequest({
    isAuthIncluded: true,
    url: `/post/like/${postId}`,
    method: "PUT",
  }),
  disLikePost: (postId: string) => sendRequest({
    isAuthIncluded: true,
    url: `/post/dislike/${postId}`,
    method: "PUT",
  }),
  uploadComment: (postId: string, data: unknown) => sendRequest({
    isAuthIncluded: true,
    url: `/post/comment/${postId}`,
    method: "PUT",
    data
  })
}
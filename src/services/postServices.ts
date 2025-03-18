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
  })
}
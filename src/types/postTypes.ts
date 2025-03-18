import { IUser } from "@types";

export interface IPost {
  imageUrl: string,
  caption: string,
  postBy: IUser,
  likes: string[]
  likesCount: number,
  comments: {
    comment: string,
    commentBy: IUser,
    createdAt: string
  }[],
  createdAt: string,
  _id: string
}
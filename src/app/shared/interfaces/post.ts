import { IUser } from "./user";

export interface IPost {
  id?: string;
  title: string;
  content: string;
  author: IUser; // Reference to the user who created the post
  likes?: number;
  dislikes?: number;
  createdAt?: Date;
}
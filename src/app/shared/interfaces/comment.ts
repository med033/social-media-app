import { IUser } from "./user";

export interface IComment {
  id?: string;
  content: string;
  avatar?: string;
  createdAt?: Date;
  createdBy?: IUser;
  likes?: number;
  dislikes?: number;
}

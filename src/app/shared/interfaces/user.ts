import { IPost } from './post';

export interface IUser {
    id?: string;
    email: string;
    avatar?: string;
    emailVerified?: boolean;
    username?: string;
    posts?: IPost[];
}
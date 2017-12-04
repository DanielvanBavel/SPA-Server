import { Document, Schema } from 'mongoose';
import { ICommentDocument, CommentSchema } from './comment.schema';
import { IUserDocument, UserSchema} from './user.schema';

export interface IPostDocument extends Document { 
    userId: string;
    content: string,
    time: string;
    comments: [ICommentDocument];
}

export const PostSchema: Schema = new Schema({
    userId: String,
    content: String,
    time: String,
    comments: [CommentSchema]
});

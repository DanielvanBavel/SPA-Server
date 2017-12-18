import { Document, Schema } from 'mongoose';
import { ICommentDocument, CommentSchema } from './comment.schema';
export interface IPostDocument extends Document { 
    user_id: string;
    username: string;
    content: string,
    time: string;
    comments: ICommentDocument[];
}

export const PostSchema: Schema = new Schema({
    user_id: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: false
    },
    comments: [CommentSchema]
}, {
     timestamps: true
 });

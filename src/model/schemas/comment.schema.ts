import { Document, Schema } from 'mongoose';

export interface ICommentDocument extends Document {
    username: string;
    content: string;
    time: string;
}

export const CommentSchema: Schema = new Schema({
    username: String,
    content: String,
    time: String
});

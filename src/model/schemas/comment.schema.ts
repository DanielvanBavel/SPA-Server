import { Document, Schema } from 'mongoose';

export interface ICommentDocument extends Document {
    username: string;
    reply: string;
    time: string;
}

export const CommentSchema: Schema = new Schema({
    username: String,
    reply: String,
    time: String
});

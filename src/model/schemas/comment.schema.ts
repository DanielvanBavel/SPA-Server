import { Document, Schema } from 'mongoose';

export interface ICommentDocument extends Document {
    name: string;
    amount: number;
}

export const CommentSchema: Schema = new Schema({
    name: String,
    amount: Number
});

import { Document, Schema } from 'mongoose';

export interface ICommentDocument extends Document {
    username: string;
    reply: string;
    time: string;
}

export const CommentSchema: Schema = new Schema({
    username: {
        type: String,
        required: false
    },
    reply: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

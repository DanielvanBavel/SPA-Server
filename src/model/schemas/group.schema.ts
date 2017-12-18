import { Document, Schema } from 'mongoose';
import { IPostDocument, PostSchema } from './post.schema';

export interface IGroupDocument extends Document { 
    name: string;
    posts: IPostDocument[];
}

export const GroupSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    posts: [PostSchema]
}, {
    timestamps: false
});

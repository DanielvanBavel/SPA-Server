import { Document, Schema } from 'mongoose';

export interface IGroupDocument extends Document { 
    name: string;
}

export const GroupSchema: Schema = new Schema({
    name: String
});

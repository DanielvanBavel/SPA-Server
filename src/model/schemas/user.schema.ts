import { Document, Schema } from 'mongoose';

export interface IUserDocument extends Document {
    username: string;
    email: string;
    password: string;
}

export const UserSchema: Schema = new Schema({
    username: String,
    email: String,
    password: String
});
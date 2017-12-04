import { Document, Model, model, Schema } from 'mongoose';
import { IUserDocument, UserSchema} from './schemas/user.schema';

export interface IUserModel extends Model<IUserDocument> { }

export const User: IUserModel = model<IUserDocument, IUserModel>('User', UserSchema);

export default User;
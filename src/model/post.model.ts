import { Document, Model, model, Schema } from 'mongoose';
import { IPostDocument, PostSchema} from './schemas/post.schema';

export interface IPostModel extends Model<IPostDocument> { }

export const Post: IPostModel = model<IPostDocument, IPostModel>('Post', PostSchema);

export default Post;

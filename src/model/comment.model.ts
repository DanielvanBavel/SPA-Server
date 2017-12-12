import { Document, Model, model, Schema } from 'mongoose';
import { ICommentDocument, CommentSchema} from './schemas/comment.schema';

export interface ICommentModel extends Model<ICommentDocument> { }

export const Comment: ICommentModel = model<ICommentDocument, ICommentModel>('Comment', CommentSchema);

export default Comment;

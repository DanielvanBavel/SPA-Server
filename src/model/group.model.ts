import { Document, Model, model, Schema } from 'mongoose';
import { IGroupDocument, GroupSchema} from './schemas/group.schema';

export interface IGroupModel extends Model<IGroupDocument> { }

export const Group: IGroupModel = model<IGroupDocument, IGroupModel>('Group', GroupSchema);

export default Group;

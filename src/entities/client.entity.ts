import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { User } from './user.entity';

@Schema()
export class Client extends Document {
    @Prop({ required: true, unique: true, message: 'Name must be unique' })
    name: string;

    @Prop({ required: true })
    contactNumber: string;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
    user: MongooseSchema.Types.ObjectId;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

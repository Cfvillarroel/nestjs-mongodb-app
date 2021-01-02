import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Client } from './client.entity';
import { User } from './user.entity';

@Schema()
export class Product extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: User.name })
    user: MongooseSchema.Types.ObjectId;

    @Prop({ type: String })
    productName: string;

    @Prop({ type: String })
    status: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Client.name })
    client: any;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Client } from './client.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Schema()
export class Sale extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: User.name })
    user: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Product.name })
    product: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Client.name })
    client: MongooseSchema.Types.ObjectId;

    @Prop({ type: Number })
    total: number;

    @Prop({ type: String })
    productName: string;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);

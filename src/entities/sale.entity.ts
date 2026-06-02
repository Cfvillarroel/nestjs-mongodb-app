import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Client } from './client.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

export type SaleDocument = HydratedDocument<Sale>;

@Schema({ timestamps: true })
export class Sale {
    @ApiProperty({ description: 'User who made the sale' })
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: User.name })
    user: MongooseSchema.Types.ObjectId;

    @ApiProperty({ description: 'Product sold' })
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Product.name })
    product: MongooseSchema.Types.ObjectId;

    @ApiProperty({ description: 'Client who bought' })
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Client.name })
    client: MongooseSchema.Types.ObjectId;

    @ApiProperty({ example: 100 })
    @Prop({ type: Number })
    total: number;

    @ApiProperty({ example: 'Widget Pro' })
    @Prop({ type: String })
    productName: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);

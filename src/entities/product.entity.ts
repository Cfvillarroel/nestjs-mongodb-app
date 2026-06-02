import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Client } from './client.entity';
import { User } from './user.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
    @ApiProperty({ description: 'User ID who owns this product' })
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: User.name })
    user: MongooseSchema.Types.ObjectId;

    @ApiProperty({ example: 'Widget Pro' })
    @Prop({ type: String })
    productName: string;

    @ApiProperty({ example: 'CREATED', enum: ['CREATED', 'SOLD'] })
    @Prop({ type: String })
    status: string;

    @ApiProperty({ description: 'Client who bought this product', required: false })
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Client.name })
    client: MongooseSchema.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

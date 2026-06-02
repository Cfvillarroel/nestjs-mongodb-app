import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { User } from './user.entity';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
    @ApiProperty({ example: 'Acme Corp' })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ example: '+56912345678' })
    @Prop({ required: true })
    contactNumber: string;

    @ApiProperty({ description: 'User ID who created this client' })
    @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: User.name })
    user: MongooseSchema.Types.ObjectId;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

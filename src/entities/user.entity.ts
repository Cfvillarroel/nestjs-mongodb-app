import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @ApiProperty({ example: 'John Doe' })
    @Prop({ required: true, unique: true })
    name: string;

    @ApiProperty({ example: 'john@example.com' })
    @Prop({ required: true, unique: true })
    email: string;

    @ApiProperty({ example: 'ADMIN', enum: ['ADMIN', 'USER'] })
    @Prop({ required: true, enum: ['ADMIN', 'USER'] })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

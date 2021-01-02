import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, enum: ['ADMIN', 'USER'] })
    role: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

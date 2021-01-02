import { IsNotEmpty, IsString } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    contactNumber: string;

    @IsString()
    @IsNotEmpty()
    userId: MongooseSchema.Types.ObjectId;
}

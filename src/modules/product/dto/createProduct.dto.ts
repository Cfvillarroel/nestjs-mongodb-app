import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateProductDto {
    @IsOptional()
    productName: string;
    @IsOptional()
    userId: MongooseSchema.Types.ObjectId;
    @IsOptional()
    id: MongooseSchema.Types.ObjectId;
    @IsOptional()
    status: string;
    @IsOptional()
    clientId: MongooseSchema.Types.ObjectId;
}

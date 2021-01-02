import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class GetSalesDto {
    @IsOptional()
    id: MongooseSchema.Types.ObjectId

    @IsOptional()
    from: number

    @IsOptional()
    limit: number
}

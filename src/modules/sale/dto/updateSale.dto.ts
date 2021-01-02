import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { CreateSaleDto } from './createSale.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
    @IsNotEmpty()
    payedAmount: number;

    @IsOptional()
    observation: string;
}

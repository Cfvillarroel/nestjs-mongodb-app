import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { CreateSaleDto } from './createSale.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
    @ApiProperty({ example: 50.00, description: 'Amount paid' })
    @IsNumber()
    @IsNotEmpty()
    payedAmount: number;

    @ApiPropertyOptional({ example: 'Partial payment' })
    @IsOptional()
    @IsString()
    observation?: string;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetSalesDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    id?: string;

    @ApiPropertyOptional({ example: 0 })
    @IsOptional()
    @Type(() => Number)
    from?: number;

    @ApiPropertyOptional({ example: 10 })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;
}

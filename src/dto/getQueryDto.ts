import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetQueryDto {
    @ApiPropertyOptional({ description: 'Resource ID to filter by' })
    @IsOptional()
    @IsString()
    id?: string;

    @ApiPropertyOptional({ description: 'Number of records to skip', example: 0 })
    @IsOptional()
    @Type(() => Number)
    from?: number;

    @ApiPropertyOptional({ description: 'Maximum number of records to return', example: 10 })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;
}

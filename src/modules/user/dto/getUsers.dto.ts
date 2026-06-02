import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUsersDto {
    @ApiProperty({ example: 'ADMIN', description: 'Filter by user role' })
    @IsNotEmpty()
    role: string;

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

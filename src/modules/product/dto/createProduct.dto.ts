import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'Widget Pro' })
    @IsString()
    @IsNotEmpty()
    productName: string;

    @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'User ID' })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    id?: string;

    @ApiPropertyOptional({ example: 'CREATED' })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiPropertyOptional({ description: 'Client ID' })
    @IsOptional()
    @IsString()
    clientId?: string;
}

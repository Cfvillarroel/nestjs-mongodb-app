import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSaleDto {
    @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Client ID' })
    @IsString()
    @IsNotEmpty()
    clientId: string;

    @ApiProperty({ example: '507f1f77bcf86cd799439012', description: 'Product ID' })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ example: '507f1f77bcf86cd799439013', description: 'User ID' })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ example: 150.00, description: 'Total amount of the sale' })
    @IsNumber()
    @IsNotEmpty()
    total: number;
}

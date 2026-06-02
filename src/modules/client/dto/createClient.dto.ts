import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
    @ApiProperty({ example: 'Acme Corp' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '+56912345678' })
    @IsString()
    @IsNotEmpty()
    contactNumber: string;

    @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'User ID' })
    @IsString()
    @IsNotEmpty()
    userId: string;
}

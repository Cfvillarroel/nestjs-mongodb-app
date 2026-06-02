import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseDto {
    @ApiProperty({ example: true })
    ok: boolean;

    @ApiPropertyOptional()
    data?: any;

    @ApiPropertyOptional({ example: 'Operation successful' })
    message?: string;

    @ApiPropertyOptional()
    error?: any;

    @ApiPropertyOptional({ example: 10, description: 'Total number of records' })
    nTotal?: number;
}

import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class GetUsersDto {
    @IsNotEmpty()
    role: string;

    @IsOptional()
    from: number;

    @IsOptional()
    @IsPositive()
    limit: number;
}

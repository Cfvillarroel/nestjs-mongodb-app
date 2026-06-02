import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './createProduct.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}

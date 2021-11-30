import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './createProduct.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}

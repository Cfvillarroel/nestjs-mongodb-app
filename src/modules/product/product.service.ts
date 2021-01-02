import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';

import { ProductRepository } from '../../repositories/product.repository';
import { UserService } from '../user/user.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository, private readonly userService: UserService) {}

    async createProduct(createProductDto: CreateProductDto) {
        return await this.productRepository.createProduct(createProductDto);
    }

    async getProductById(productId: MongooseSchema.Types.ObjectId) {
        return await this.productRepository.getProductById(productId);
    }

    async getProducts(getQueryDto: GetQueryDto) {
        return await this.productRepository.getProducts(getQueryDto);
    }

    async updateProduct(updateProductDto: UpdateProductDto) {
        const product = await this.productRepository.updateProduct(updateProductDto);
        return product;
    }
}

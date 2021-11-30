import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { ProductRepository } from '../../repositories/product.repository';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    async createProduct(createProductDto: CreateProductDto, session: ClientSession) {
        return await this.productRepository.createProduct(createProductDto, session);
    }

    async getProductById(productId: MongooseSchema.Types.ObjectId) {
        return await this.productRepository.getProductById(productId);
    }

    async getProducts(getQueryDto: GetQueryDto) {
        return await this.productRepository.getProducts(getQueryDto);
    }

    async updateProduct(updateProductDto: UpdateProductDto, session: ClientSession) {
        return await this.productRepository.updateProduct(updateProductDto, session);
    }
}

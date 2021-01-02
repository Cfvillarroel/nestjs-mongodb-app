import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../dto/getQueryDto';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../modules/product/dto/createProduct.dto';
import { UpdateProductDto } from '../modules/product/dto/updateProduct.dto';

export class ProductRepository {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

    async createProduct(createProductDto: CreateProductDto) {
        const newProduct = new this.productModel({
            user: createProductDto.userId,
            productName: createProductDto.productName,
            status: 'CREATED',
            client: null,
        });
        try {
            const createdProduct = await newProduct.save();

            return createdProduct;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateProduct(updateProduct: UpdateProductDto) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            status: updateProduct.status,
            client: updateProduct.clientId,
            updatedAt: actualDate,
        };

        try {
            const product = await this.productModel
                .findOneAndUpdate({ _id: updateProduct.id }, updateData, {
                    new: true,
                })
                .exec();
            return product;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getProducts(query: GetQueryDto) {
        // Paginar resultado
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let products: Product[];

        try {
            if (limit === 0) {
                products = await this.productModel
                    .find()
                    .populate('client')
                    .populate('user', 'name email')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                products = await this.productModel
                    .find()
                    .populate('client')
                    .populate('user', 'name email')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (products.length > 0) {
                response = {
                    ok: true,
                    data: products,
                    message: 'Get Products Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay products',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getProductById(id: MongooseSchema.Types.ObjectId) {
        try {
            const product = await this.productModel.findById(id).exec();

            return product;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}

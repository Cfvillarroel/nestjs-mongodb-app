import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { Product, ProductDocument } from '../entities/product.entity';
import { CreateProductDto } from '../modules/product/dto/createProduct.dto';
import { UpdateProductDto } from '../modules/product/dto/updateProduct.dto';

@Injectable()
export class ProductRepository {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

    async createProduct(createProductDto: CreateProductDto, session: ClientSession) {
        let product = new this.productModel({
            user: createProductDto.userId,
            productName: createProductDto.productName,
            status: 'CREATED',
            client: null,
        });
        try {
            product = await product.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return product;
    }

    async updateProduct(updateProduct: UpdateProductDto, session: ClientSession) {
        const updateData = {
            status: updateProduct.status,
            client: updateProduct.clientId,
        };

        let product;
        try {
            product = await this.productModel
                .findOneAndUpdate({ _id: updateProduct.id }, updateData, { new: true })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async getProductById(productId: string) {
        let product;
        try {
            product = await this.productModel.findById(productId).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async getProducts(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let products: ProductDocument[];

        try {
            const queryBuilder = this.productModel.find().populate('user').populate('client').skip(from).sort({ createdAt: -1 });

            if (limit > 0) {
                queryBuilder.limit(limit);
            }

            products = await queryBuilder.exec();

            const response: ResponseDto = {
                ok: true,
                data: products,
                message: products.length > 0 ? 'Get Products Ok!' : 'No products found',
            };
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}

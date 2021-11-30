import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { Product } from '../entities/product.entity';
import { Sale } from '../entities/sale.entity';
import { CreateSaleDto } from '../modules/sale/dto/createSale.dto';

export class SaleRepository {
    constructor(@InjectModel(Sale.name) private readonly saleModel: Model<Sale>) {}

    async createSale(createSaleDto: CreateSaleDto, product: Product, userId: MongooseSchema.Types.ObjectId, session: ClientSession) {
        let sale = new this.saleModel({
            user: userId,
            product: product._id,
            client: createSaleDto.clientId,
            productName: product.productName,
            total: createSaleDto.total,
        });

        try {
            sale = await sale.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!sale) {
            throw new BadRequestException('Sale not created');
        }

        return sale;
    }

    async getSales(query: { from: number; limit: number }) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let sales: Sale[];

        try {
            if (limit === 0) {
                sales = await this.saleModel
                    .find()
                    .populate('sale')
                    .populate('product')
                    .populate('client')
                    .populate('user', 'name email')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                sales = await this.saleModel
                    .find()
                    .populate('sale')
                    .populate('product')
                    .populate('client')
                    .populate('user', 'name email')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (sales.length > 0) {
                response = {
                    ok: true,
                    data: sales,
                    message: 'Get Sales Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay sales',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getSaleById(id: MongooseSchema.Types.ObjectId) {
        let sale;
        try {
            sale = await this.saleModel
                .findById(id)
                .populate('product')
                .populate('client')
                .populate('user', 'name email')
                .exec();
        } catch (error) {
            throw new BadRequestException(error);
        }

        if (!sale) {
            throw new NotFoundException('Sale not found');
        }

        return sale;
    }

    async getSaleByProductId(productId: MongooseSchema.Types.ObjectId) {
        let sale;
        try {
            sale = await this.saleModel.find({ product: productId }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!sale) {
            throw new NotFoundException('Sale not found');
        }

        return sale;
    }
}

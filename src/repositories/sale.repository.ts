import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Product } from '../entities/product.entity';
import { Sale, SaleDocument } from '../entities/sale.entity';
import { CreateSaleDto } from '../modules/sale/dto/createSale.dto';

@Injectable()
export class SaleRepository {
    constructor(@InjectModel(Sale.name) private readonly saleModel: Model<SaleDocument>) {}

    async createSale(createSaleDto: CreateSaleDto, product: Product & { _id: any }, userId: string, session: ClientSession) {
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

        let sales: SaleDocument[];

        try {
            const queryBuilder = this.saleModel.find().populate('product').populate('client').populate('user', 'name email').skip(from).sort({ createdAt: -1 });

            if (limit > 0) {
                queryBuilder.limit(limit);
            }

            sales = await queryBuilder.exec();

            return {
                ok: true,
                data: sales,
                message: sales.length > 0 ? 'Get Sales Ok!' : 'No sales found',
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getSaleById(id: string) {
        let sale;
        try {
            sale = await this.saleModel.findById(id).populate('product').populate('client').populate('user', 'name email').exec();
        } catch (error) {
            throw new BadRequestException(error);
        }

        if (!sale) {
            throw new NotFoundException('Sale not found');
        }

        return sale;
    }

    async getSaleByProductId(productId: string) {
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

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { SaleRepository } from '../../repositories/sale.repository';
import { UpdateProductDto } from '../product/dto/updateProduct.dto';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { CreateSaleDto } from './dto/createSale.dto';

@Injectable()
export class SaleService {
    constructor(
        private saleRepository: SaleRepository,
        private readonly userService: UserService,
        private readonly productService: ProductService,
    ) {}

    async createSale(createSaleDto: CreateSaleDto) {
        const { userId, productId, clientId } = createSaleDto;

        const getUser: any = await this.userService.getUserById(userId);

        if (getUser.role === 'ADMIN') {
            const product = await this.productService.getProductById(productId);
            const createdSale = await this.saleRepository.createSale(createSaleDto, product, userId);

            const updateProductDto: UpdateProductDto = {
                id: product._id,
                status: 'SOLD',
                clientId: clientId,
            };
            await this.productService.updateProduct(updateProductDto);

            return createdSale;
        } else {
            throw new UnauthorizedException('Incorrect Role');
        }
    }

    async getSaleById(saleId: MongooseSchema.Types.ObjectId) {
        const sale: any = await this.saleRepository.getSaleById(saleId);
        return sale;
    }

    async getSales(query: { from: number; limit: number }) {
        const sales = await this.saleRepository.getSales(query);
        return sales;
    }
}

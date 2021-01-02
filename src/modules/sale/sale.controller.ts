import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateSaleDto } from './dto/createSale.dto';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
    constructor(private saleService: SaleService) {}

    @Post('/createSale')
    async createSale(@Body() createSaleDto: CreateSaleDto, @Res() res: any) {
        const newProduct: any = await this.saleService.createSale(createSaleDto);
        return res.status(HttpStatus.OK).send(newProduct);
    }

    @Get('/getSaleById/:id')
    async getSaleById(@Param('id') id: MongooseSchema.Types.ObjectId, @Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storage: any = await this.saleService.getSaleById(id);
        return res.status(HttpStatus.OK).send(storage);
    }
}

import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateSaleDto } from './dto/createSale.dto';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private saleService: SaleService) {}

    @Post('/createSale')
    async createSale(@Body() createSaleDto: CreateSaleDto, @Res() res: any) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newProduct: any = await this.saleService.createSale(createSaleDto);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get('/getSaleById/:id')
    async getSaleById(@Param('id') id: MongooseSchema.Types.ObjectId, @Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storage: any = await this.saleService.getSaleById(id);
        return res.status(HttpStatus.OK).send(storage);
    }
}

import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Connection } from 'mongoose';
import { CreateSaleDto } from './dto/createSale.dto';
import { SaleService } from './sale.service';

@ApiTags('Sales')
@Controller('sale')
export class SaleController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private saleService: SaleService) {}

    @Post('/createSale')
    @ApiOperation({ summary: 'Create a new sale (requires ADMIN user)' })
    @ApiResponse({ status: 201, description: 'Sale created successfully' })
    @ApiResponse({ status: 401, description: 'User is not an ADMIN' })
    async createSale(@Body() createSaleDto: CreateSaleDto) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newSale = await this.saleService.createSale(createSaleDto, session);
            await session.commitTransaction();
            return newSale;
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get('/getSaleById/:id')
    @ApiOperation({ summary: 'Get a sale by ID' })
    @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
    @ApiResponse({ status: 200, description: 'Sale found' })
    @ApiResponse({ status: 404, description: 'Sale not found' })
    async getSaleById(@Param('id') id: string) {
        return await this.saleService.getSaleById(id);
    }
}

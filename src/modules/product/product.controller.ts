import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post('/createProduct')
    async createProduct(@Body() createProductDto: CreateProductDto, @Res() res: any) {
        const newProduct: any = await this.productService.createProduct(createProductDto);
        return res.status(HttpStatus.OK).send(newProduct);
    }

    @Put('/updateProduct/:id')
    async updateProduct(
        @Param('id') id: MongooseSchema.Types.ObjectId,
        @Body() updateProductDto: UpdateProductDto,
        @Res() res: any,
    ) {
        const newProduct: any = await this.productService.updateProduct(updateProductDto);
        return res.status(HttpStatus.OK).send(newProduct);
    }

    @Get('/getProductById/:id')
    async getProductById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const storage: any = await this.productService.getProductById(id);

        return res.status(HttpStatus.OK).send(storage);
    }

    @Get('/getProducts')
    async getAllProducts(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.productService.getProducts(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }
}

import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Connection } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('product')
export class ProductController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private productService: ProductService) {}

    @Post('/createProduct')
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully' })
    async createProduct(@Body() createProductDto: CreateProductDto) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newProduct = await this.productService.createProduct(createProductDto, session);
            await session.commitTransaction();
            return newProduct;
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Put('/updateProduct/:id')
    @ApiOperation({ summary: 'Update a product by ID' })
    @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const updatedProduct = await this.productService.updateProduct(updateProductDto, session);
            await session.commitTransaction();
            return updatedProduct;
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get('/getProductById/:id')
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
    @ApiResponse({ status: 200, description: 'Product found' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    async getProductById(@Param('id') id: string) {
        return await this.productService.getProductById(id);
    }

    @Get('/getProducts')
    @ApiOperation({ summary: 'Get all products with optional pagination' })
    async getAllProducts(@Query() getQueryDto: GetQueryDto) {
        return await this.productService.getProducts(getQueryDto);
    }
}

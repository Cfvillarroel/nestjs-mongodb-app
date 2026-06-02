import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Connection } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/createClient.dto';

@ApiTags('Clients')
@Controller('client')
export class ClientController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private clientService: ClientService) {}

    @Post('/createClient')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new client (requires ADMIN user)' })
    @ApiResponse({ status: 201, description: 'Client created successfully' })
    @ApiResponse({ status: 401, description: 'User is not an ADMIN' })
    @ApiResponse({ status: 409, description: 'Client already exists' })
    async createClient(@Body() createClientDto: CreateClientDto) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newClient = await this.clientService.createClient(createClientDto, session);
            await session.commitTransaction();
            return newClient;
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get('/getClients')
    @ApiOperation({ summary: 'Get all clients with optional pagination' })
    async getClients(@Query() getQueryDto: GetQueryDto) {
        return await this.clientService.getClients(getQueryDto);
    }

    @Get('/getClientById/:id')
    @ApiOperation({ summary: 'Get a client by ID' })
    @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
    @ApiResponse({ status: 200, description: 'Client found' })
    @ApiResponse({ status: 404, description: 'Client not found' })
    async getClientById(@Param('id') id: string) {
        return await this.clientService.getClientById(id);
    }
}

import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/createClient.dto';

@Controller('client')
export class ClientController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private clientService: ClientService) {}

    @Post('/createClient')
    async createClient(@Body() createClientDto: CreateClientDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newClient = await this.clientService.createClient(createClientDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.CREATED).send(newClient);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get('/getClients')
    async getClients(@Query() getQueryDto: GetQueryDto, @Res() res: Response) {
        const clients: any = await this.clientService.getClients(getQueryDto);
        return res.status(HttpStatus.OK).send(clients);
    }

    @Get('/getClientById/:id')
    async getClientById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const client: any = await this.clientService.getClientById(id);
        return res.status(HttpStatus.OK).send(client);
    }
}

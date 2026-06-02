import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { Client, ClientDocument } from '../entities/client.entity';
import { CreateClientDto } from '../modules/client/dto/createClient.dto';

@Injectable()
export class ClientRepository {
    constructor(
        @InjectModel(Client.name)
        private readonly clientModel: Model<ClientDocument>,
    ) {}

    async createClient(createClientDto: CreateClientDto, session: ClientSession) {
        const existing = await this.getClientByName(createClientDto.name);

        if (existing && existing.length > 0) {
            throw new ConflictException('Client Already Exists!');
        }

        let client = new this.clientModel({
            name: createClientDto.name,
            contactNumber: createClientDto.contactNumber,
            user: createClientDto.userId,
        });

        try {
            client = await client.save({ session });
        } catch (error) {
            throw new InternalServerErrorException('Error saving client', error);
        }

        return client;
    }

    async getClients(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let clients: ClientDocument[];

        try {
            const queryBuilder = this.clientModel.find().populate('user').skip(from).sort({ createdAt: -1 });

            if (limit > 0) {
                queryBuilder.limit(limit);
            }

            clients = await queryBuilder.exec();

            const response: ResponseDto = {
                ok: true,
                data: clients,
                message: clients.length > 0 ? 'Get Clients Ok!' : 'No clients found',
            };
            return response;
        } catch (error) {
            throw new InternalServerErrorException('Error fetching clients', error);
        }
    }

    async getClientById(id: string) {
        let client;
        try {
            client = await this.clientModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException('Error fetching client with id ' + id, error);
        }

        if (!client) {
            throw new NotFoundException('The client with this id does not exist');
        }

        return client;
    }

    async getClientByName(name: string) {
        try {
            return await this.clientModel.find({ name });
        } catch (error) {
            throw new InternalServerErrorException('Error connecting to MongoDB', error);
        }
    }
}

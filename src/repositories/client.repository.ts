import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../modules/client/dto/createClient.dto';

export class ClientRepository {
    constructor(
        @InjectModel(Client.name)
        private readonly clientModel: Model<Client>,
    ) {}

    async createClient(createClientDto: CreateClientDto, session: ClientSession) {
        let client = await this.getClientByName(createClientDto.name);

        if (client) {
            throw new ConflictException('Client Already Exists!');
        }

        client = new this.clientModel({
            name: createClientDto.name,
            contactNumber: createClientDto.contactNumber,
            user: createClientDto.userId,
        });

        try {
            client = await client.save({ session });
        } catch (error) {
            throw new InternalServerErrorException('Error al consultar la BD', error);
        }

        return client;
    }

    async getClients(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let clients: Client[];

        try {
            if (limit === 0) {
                clients = await this.clientModel
                    .find()
                    .populate('client')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                clients = await this.clientModel
                    .find()
                    .populate('client')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response: ResponseDto;

            if (clients.length > 0) {
                response = {
                    ok: true,
                    data: clients,
                    message: 'Get Clients Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay clientes',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException('Error al intentar consultar los clientes', error);
        }
    }

    async getClientById(id: MongooseSchema.Types.ObjectId) {
        let client;
        try {
            client = await this.clientModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException('No existe el registro con id' + id, error);
        }

        if (!client) {
            throw new NotFoundException('The client with this id does not exist');
        }

        return client;
    }

    async getClientByName(name: string): Promise<Client> {
        let client;

        try {
            client = await this.clientModel.find({ name });
        } catch (error) {
            throw new InternalServerErrorException('Error connecting to MongoDB', error);
        }

        return client;
    }
}

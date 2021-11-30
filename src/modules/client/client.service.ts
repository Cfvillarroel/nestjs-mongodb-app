import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { ClientRepository } from '../../repositories/client.repository';
import { UserService } from '../user/user.service';
import { CreateClientDto } from './dto/createClient.dto';

@Injectable()
export class ClientService {
    constructor(private readonly clientRepository: ClientRepository, private readonly userService: UserService) {}

    async createClient(createClientDto: CreateClientDto, session: ClientSession) {
        const getUser: any = await this.userService.getUserById(createClientDto.userId);

        if (getUser.role === 'ADMIN') {
            return await this.clientRepository.createClient(createClientDto, session);
        } else {
            throw new UnauthorizedException('Incorrect Role');
        }
    }

    async getClients(getQueryDto: GetQueryDto) {
        return await this.clientRepository.getClients(getQueryDto);
    }

    async getClientById(id: MongooseSchema.Types.ObjectId) {
        return await this.clientRepository.getClientById(id);
    }
}

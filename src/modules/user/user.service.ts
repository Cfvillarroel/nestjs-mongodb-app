import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { UserRepository } from '../../repositories/user.repository';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(createUserDto: CreateUserDto) {
        const createdUser = await this.userRepository.createUser(createUserDto);
        return createdUser;
    }

    async getUserById(id: MongooseSchema.Types.ObjectId) {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new UnauthorizedException('No existe el usuario!');
        }
        return user;
    }
}

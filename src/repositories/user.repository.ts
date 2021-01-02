import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../modules/user/dto/createUser.dto';

export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDto) {
        const userExists: any = await this.getUserByEmail(createUserDto.email);

        if (userExists.length === 0) {
            const newUser = new this.userModel({
                name: createUserDto.name,
                email: createUserDto.email,
                role: createUserDto.role,
            });

            try {
                const createdUser = await newUser.save();
                return createdUser;
            } catch (error) {
                throw new InternalServerErrorException(error);
            }
        } else {
            throw new ConflictException('User Exists');
        }
    }

    async getUserById(id: MongooseSchema.Types.ObjectId) {
        try {
            const user = await this.userModel.findById({ _id: id });
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await this.userModel.find({ email }, 'name email img role').exec();
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}

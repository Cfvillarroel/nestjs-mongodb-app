import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/createUser')
    async createUser(@InjectConnection() private readonly mongoConnection: Connection, @Body() createUserDto: CreateUserDto, @Res() res: any) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newUser: any = await this.userService.createUser(createUserDto);
            await session.commitTransaction();
            return res.status(HttpStatus.CREATED).send(newUser);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get('/getUserById/:id')
    async getCompanyById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const user: any = await this.userService.getUserById(id);
        return res.status(HttpStatus.OK).send(user);
    }
}

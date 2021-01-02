import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/createUser')
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: any) {
        const newUser: any = await this.userService.createUser(createUserDto);
        return res.status(HttpStatus.CREATED).send(newUser);
    }

    @Get('/getUserById/:id')
    async getCompanyById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const user: any = await this.userService.getUserById(id);
        return res.status(HttpStatus.OK).send(user);
    }
}

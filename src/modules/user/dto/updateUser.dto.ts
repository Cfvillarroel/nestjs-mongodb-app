import { PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

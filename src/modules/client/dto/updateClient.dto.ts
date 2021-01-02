import { PartialType } from '@nestjs/mapped-types';

import { CreateClientDto } from './createClient.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) { }

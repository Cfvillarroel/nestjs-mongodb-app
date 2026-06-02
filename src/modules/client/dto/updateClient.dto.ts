import { PartialType } from '@nestjs/swagger';

import { CreateClientDto } from './createClient.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {}

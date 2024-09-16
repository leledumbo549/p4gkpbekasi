import { PartialType } from '@nestjs/swagger';
import { CreateWabotDto } from './create-wabot.dto';

export class UpdateWabotDto extends PartialType(CreateWabotDto) {}

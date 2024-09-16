import { PartialType } from '@nestjs/swagger';
import { CreateCalon1Dto } from './create-calon1.dto';

export class UpdateCalon1Dto extends PartialType(CreateCalon1Dto) {}

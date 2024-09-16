import { Injectable } from '@nestjs/common';
import { CreateWabotDto } from './dto/create-wabot.dto';
import { UpdateWabotDto } from './dto/update-wabot.dto';

@Injectable()
export class WabotService {
  create(createWabotDto: CreateWabotDto) {
    return 'This action adds a new wabot';
  }

  findAll() {
    return `This action returns all wabot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wabot`;
  }

  update(id: number, updateWabotDto: UpdateWabotDto) {
    return `This action updates a #${id} wabot`;
  }

  remove(id: number) {
    return `This action removes a #${id} wabot`;
  }
}

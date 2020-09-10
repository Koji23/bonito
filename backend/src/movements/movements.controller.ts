import { Controller, Get } from '@nestjs/common';

@Controller('movements')
export class MovementsController {
  @Get()
  findAll() {
    return 'this route returns all movements';
  }
}

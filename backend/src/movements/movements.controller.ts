import { Controller, Get, Param } from '@nestjs/common';

@Controller('movements')
export class MovementsController {
  @Get()
  findAll() {
    return 'this route returns all movements';
  }

  // @Get(':id')
  // findOne(@Param() params) {
  //   return `this route returns ${params.id} movement`;
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this route returns ${id} movement`;
  }
}

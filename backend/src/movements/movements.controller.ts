import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { create } from 'domain';

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

  @Post()
  create(@Body() body: any){
    return body;
  }
}

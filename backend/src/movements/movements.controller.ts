import { Controller, Get, Param, Post, Body, HttpCode, HttpStatus, Res, Patch, Delete, Query } from '@nestjs/common';
import { create } from 'domain';

@Controller('movements')
export class MovementsController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    // try visit: localhost:3001/movements?limit=20&offset=10
    return `this route returns all movements. Limit ${limit}, offset ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this route returns ${id} movement`;
  }

  // @Get(':id')
  // findOne(@Param() params) {
  //   return `this route returns ${params.id} movement`;
  // }

  @Post()
  create(@Body() body: any){
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: 'string', @Body() body) {
    return `this route updates ${id} movement`;
  }

  @Delete(':id')
  remove(@Param('id') id: 'string', @Body() body) {
    return `this route removes ${id} movement`;
  }
}

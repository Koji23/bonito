import { Controller, Get, Param, Post, Body, HttpCode, HttpStatus, Res, Patch, Delete, Query } from '@nestjs/common';
import { create } from 'domain';
import { MovementsService } from './movements.service';
import { CreateMovementsDto } from './dto/create-movements.dto';
import { UpdateMovementsDto } from './dto/update-movements.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('movements')
export class MovementsController {

  // injecting a dependency for a provider such as MovementsService is done in a constructor
  // The "private" access modifier is Typescript shorthand allowing us to declare and initialize
  // Service immediately in the same location, while also restricting access to it within the
  // class itself. 
  // The "readonly" keyword is a bestpractice that ensures we aren't modifying the MovementsService
  // and only accessing things from it
  // It's common practice to call the service's variable name by a lower cased version of its type
  // By specifying the type here, Nest will resolve the MovementsService automatically by creating
  // and returning and instance of it to the MovementsController. Or in the normal case of a singleton,
  // returning an existing instance if it has already been created elsewhere
  constructor(private readonly movementsService: MovementsService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery; // try visit: localhost:3001/movements?limit=20&offset=10
    return this.movementsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // Since 'id' is a URL param it is a string by default. But by specifying a number type here, Nest's ValidationPipe will
    // transform the type to number
    return this.movementsService.findOne(id);
  }

  @Post()
  create(@Body() createMovementsDto: CreateMovementsDto){
    // createMovementsDto is and actual instance of CreateMovementsDto here due to the global ValidationPipe's transform property.
    // note: This transform feature may have a slight impact performance, test to be sure it is negligible
    return this.movementsService.create(createMovementsDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMovementsDto: UpdateMovementsDto) {
    return this.movementsService.update(id, updateMovementsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Body() body) {
    return this.movementsService.remove(id);
  }
}

import { Controller, Get, Param, Post, Body, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { create } from 'domain';

@Controller('movements')
export class MovementsController {
  @Get()
  findAll(@Res() response) {
    // Since nest is using express by default, we can utilze any method standard to the
    // express library using the response. this feature allows some added flexiblity by allowing
    // full control of the response object for header manipulation or library specific features,
    // it should be used with caution. Doing this breaks compatibility with Nest features that depend
    // on Nest standard response handling (such as interceptors and the HTTPCode decorator) It also makes
    // our code platform dependent and harder to test (since we'd need to mock the response object) 
    // ie:
      // response.status(200).send('this route returns all movements...')
    
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
  @HttpCode(HttpStatus.GONE) // This is an example of what we might want to do if we were going to deprecate this endpoint
  create(@Body() body: any){
    return body;
  }
}

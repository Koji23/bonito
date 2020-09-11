import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Movement } from './entities/movement.entity';

// Services are for separating business logic out of the controller.
// Thus making them reusable throughout the application
// The @Injectable makes this a Provider. This MovementsService will be
// responsible for data storage and retrieval of movements primarily for 
// use in the MovementsController but really anywhwere that might benefit
@Injectable()
export class MovementsService {
  private movements: Movement[] = [
    {
      id: 0,
      name: 'bench press',
      muscles: ['chest', 'triceps'],
      difficulty: 5,
      equipment: ['bench', 'barbell', 'rack'],
    }
  ];

  findAll() {
    return this.movements;
  }

  findOne(id: string) {
    const movement = this.movements.find(item => item.id === +id);
      if (!movement) {
      // throw new HttpException(`Movement #${id} Not Found`, HttpStatus.NOT_FOUND)
      // Nest supplies helper methods for all of the common error messages
      // Note: nest will also has an exceptions layer that will handle non-http exceptions
      // such as regular javascript errors with things such as a 500 error
      throw new NotFoundException(`Movement #${id} Not Found`);
    }
    return movement;
  }

  create(createCoffeeDto: any) {
    return this.movements.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    // if (existingCoffee) {
    //   // update the existing entity
    // }
  }

  remove(id: string) {
    const movementsIndex = this.movements.findIndex(item => item.id === +id);
    if (movementsIndex >= 0) {
      this.movements.splice(movementsIndex, 1);
    }
  }
}

import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovementsDto } from './dto/create-movements.dto';
import { UpdateMovementsDto } from './dto/update-movements.dto';
import { Movement } from './entities/movement.entity';
import { MovementsController } from './movements.controller';

// Services are for separating business logic out of the controller.
// Thus making them reusable throughout the application
// The @Injectable makes this a Provider. This MovementsService will be
// responsible for data storage and retrieval of movements primarily for 
// use in the MovementsController but really anywhwere that might benefit
@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,
  ){}

  findAll() {
    return this.movementRepository.find();
  }

  async findOne(id: number) {
    const movement = await this.movementRepository.findOne(id);
    if (!movement) {
      // throw new HttpException(`Movement #${id} Not Found`, HttpStatus.NOT_FOUND)
      // Nest supplies helper methods for all of the common error messages
      // Note: nest will also has an exceptions layer that will handle non-http exceptions
      // such as regular javascript errors with things such as a 500 error
      throw new NotFoundException(`Movement #${id} Not Found`);
    }
    return movement;
  }

  create(createMovementDto: CreateMovementsDto) {
    const movement = this.movementRepository.create(createMovementDto)
    return this.movementRepository.save(movement);
  }

  async update(id: number, updateCoffeeDto: UpdateMovementsDto) {
    const movement = await this.movementRepository.preload({
      id,
      ...updateCoffeeDto,
    });

    if (!movement) {
      throw new NotFoundException(`Movement #${id} Not Found`);
    }

    return this.movementRepository.save(movement);
  }

  async remove(id: number) {
    const movement = await this.movementRepository.findOne(id);
    return this.movementRepository.remove(movement)
  }
}

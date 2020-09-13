import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovementsDto } from './dto/create-movements.dto';
import { UpdateMovementsDto } from './dto/update-movements.dto';
import { Equipment } from './entities/equipment.entity';
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
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ){}

  findAll() {
    return this.movementRepository.find({
      relations: ['equipment'], // by default TypeORM will simply omit any relations unless we specify otherwise
    });
  }

  async findOne(id: number) {
    const movement = await this.movementRepository.findOne(id, {
      relations: ['equipment'],
    });
    if (!movement) {
      // throw new HttpException(`Movement #${id} Not Found`, HttpStatus.NOT_FOUND)
      // Nest supplies helper methods for all of the common error messages
      // Note: nest will also has an exceptions layer that will handle non-http exceptions
      // such as regular javascript errors with things such as a 500 error
      throw new NotFoundException(`Movement #${id} Not Found`);
    }
    return movement;
  }

  async create(createMovementDto: CreateMovementsDto) {
    // Find or create any necessary equipment for this relation
    const equipment = await Promise.all(
      createMovementDto.equipment.map(name => this.preloadEquipmentByName(name)),
    );

    const movement = this.movementRepository.create({
      ...createMovementDto,
      equipment,
    })
    return this.movementRepository.save(movement);
  }

  async update(id: number, updateCoffeeDto: UpdateMovementsDto) {
    const equipment =
      updateCoffeeDto.equipment && // since properties are optional in update, make sure it exists before calling .map
      (await Promise.all(
        updateCoffeeDto.equipment.map(name => this.preloadEquipmentByName(name)),
      ));
      const movement = await this.movementRepository.preload({
        ...updateCoffeeDto,
        id,
      equipment,
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

  private async preloadEquipmentByName(name: string): Promise<Equipment> {
    const existingEquipment = await this.equipmentRepository.findOne({ name });
    if (existingEquipment) {
      return existingEquipment;
    }

    return this.equipmentRepository.create({ name })
  }
}

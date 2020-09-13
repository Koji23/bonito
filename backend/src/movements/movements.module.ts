import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from './entities/movement.entity';
import { MovementsController } from './movements.controller';
import { MovementsService } from './movements.service';

// Nest Modules contain 4 main things:
// controllers - Which you can think of as our API Routes, that we want this module to instantiate.
// exports - Here we can list providers within this current module that should be made available anywhere this module is imported
// imports - Just as we saw in the AppModule, the imports Array gives us the ability to list OTHER modules that THIS module requires. Any exported providers of these imported modules are now fully available here as well.
// providers - Here we’re going to list our services that need to be instantiated by the Nest injector.  Any providers here will be available only within “THIS” module itself, unless added to the exports array we saw above.
@Module({
  imports: [ TypeOrmModule.forFeature([Movement]) ], // Since MovementsModule is a child module, we use forFeature tp register typeorm rather than forRoot
  controllers: [ MovementsController ],
  providers: [ MovementsService ],
})
export class MovementsModule {}

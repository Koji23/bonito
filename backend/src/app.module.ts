import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovementsModule } from './movements/movements.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MovementsModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'postgres-db', // database host. ie: localhost. But here Docker-compose will sub in the service name of our postgres database. TODO: change this to env variable
      port: 5432, // database port (uses the container's port not the host's port)
      username: 'postgres', // username
      password: 'abc123', // user password, *see docker-compose.yml
      database: 'bonito', // name of our database, *see docker-compose.yml
      autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
      synchronize: true, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (TODO: disable in the production). This means nest will automatically generate a SQL table for all classes with the @Entity decorator. This will undo any migrations that aren't aren't mirrored in the entities
    }),
  ],
  controllers: [AppController],
  providers: [AppService], // Providers can inject dependencies. This means that objects can create various relationships to each other. And the Nest.js runtime system will handle the logic of wiring up instances of objects together for you
})
export class AppModule {}

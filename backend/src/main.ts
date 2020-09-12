import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this will filter out any provided data not whitelisted by our DTO
      forbidNonWhitelisted: true, // this will further stop the request if non-whitelisted data is present
    }),
  ); // note there are other ways of binding global pipes
  await app.listen(3000);
}
bootstrap();

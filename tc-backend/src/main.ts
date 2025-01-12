import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { SeederModule } from './seeder/seeder.module';
import { ManagerSeeder } from './seeder/manager.seeder';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  };

  app.use(cors(corsOptions));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);[]
}

bootstrap();

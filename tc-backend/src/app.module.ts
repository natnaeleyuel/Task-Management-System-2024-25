import { Module } from '@nestjs/common';
import { AuthenticationModule } from './auth/authentication.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthenticationModule, 
    UsersModule, 
    TasksModule, 
    PrismaModule,
    SeederModule
  ],
})
export class AppModule {}

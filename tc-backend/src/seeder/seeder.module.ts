import { Module } from '@nestjs/common';  // Import from @nestjs/common
import { ManagerSeeder } from './manager.seeder';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [ManagerSeeder, PrismaService],  // Make sure your seeder is listed here
})
export class SeederModule {}

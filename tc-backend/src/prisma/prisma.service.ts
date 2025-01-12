import {
    Injectable,
    OnModuleDestroy,
    OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleDestroy, OnApplicationShutdown
{
    private _group: any;
    public get group(): any {
        return this._group;
    }
    public set group(value: any) {
        this._group = value;
    }
    constructor(config: ConfigService) {
        const databaseUrl = config.get('DATABASE_URL');

        if (!databaseUrl) {
            throw new Error('DATABASE_URL is not set in the environment variables');
        }

        super({
            datasources: {
                db: {
                    url: databaseUrl,
                },
            },
            log: ['query', 'info', 'warn', 'error'], // Enable query and error logging
        });
    }

    async onModuleDestroy() {
        console.log('Closing Prisma connection (onModuleDestroy)');
        await this.$disconnect();
    }

    async onApplicationShutdown() {
        console.log('Closing Prisma connection (onApplicationShutdown)');
        await this.$disconnect();
    }
}

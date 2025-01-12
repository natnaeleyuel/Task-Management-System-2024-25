import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    private readonly logger = new Logger(JwtStrategy.name);

    constructor(
        config: ConfigService,
        private prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });

        if (!config.get('JWT_SECRET')) {
            this.logger.error('JWT_SECRET is not set in the environment variables');
            throw new Error('JWT_SECRET is required');
        }
    }

    async validate(payload: { sub: number; email: string }) {
        this.logger.log(`Validating user with ID: ${payload.sub}`);

        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user) {
            this.logger.warn(`User with ID ${payload.sub} not found`);
            throw new UnauthorizedException();
        }

        delete user.password; // Ensure password is not included in the returned object
        return user;
    }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupAuthDto, LoginAuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupAuthDto) {
    const hash = await argon.hash(dto.password);

    // Validate role
    if (!['user', 'manager'].includes(dto.role)) {
      throw new ForbiddenException('Invalid role provided');
    }
    const groupId = parseInt(dto.groupId);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          firstname: dto.firstname,
          lastname: dto.lastname,
          role: dto.role,
          groupId: groupId,
        },
      });

      return this.signToken(user.id, user.email, user.role);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async login(dto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    return this.signToken(user.id, user.email, user.role);
  }

  async signToken(userId: number, email: string, role: string) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });

    return {
      access_token: token,
      user: { id: userId, email, role },
    };
  }
}

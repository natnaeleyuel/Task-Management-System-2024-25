import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
    // for signin decode json web tokens
    imports: [JwtModule.register({})],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, JwtStrategy],
})
export class AuthenticationModule{}
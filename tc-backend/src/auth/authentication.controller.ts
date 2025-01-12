import { 
    Body, 
    Controller, 
    HttpStatus, 
    Post, 
    HttpCode, 
    Req, 
    UseGuards 
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginAuthDto, SignupAuthDto } from './dto';
import { JwtGuard } from './guard/jwt.guard';
import { ValidationPipe } from '@nestjs/common';

@Controller('authentication')
export class AuthenticationController {
    constructor(private authenticationService: AuthenticationService) {}

    @Post('signup') // POST /authentication/signup
    async signup(@Body(new ValidationPipe()) dto: SignupAuthDto) {
        return this.authenticationService.signup(dto);
    }

    @HttpCode(HttpStatus.OK) // HTTP 200 OK for successful login
    @Post('login') // POST /authentication/login
    async login(@Body(new ValidationPipe()) dto: LoginAuthDto) {
        return this.authenticationService.login(dto);
    }

    @UseGuards(JwtGuard)
    @Post('logout')
    async logout(@Req() req) {
        const userId = req.user.sub; // Extract user info from the JWT payload
        // Invalidate the token (e.g., add to a blacklist)
        return { message: `User with ID ${userId} logged out successfully` };
    }
}

import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserDTO } from '../database/DTOs/user.dto';
import { AuthService } from './auth.service';
import { LoginResponse } from './DTOs/responseDTO/LoginResponse.dto';

@Controller('auth')
export class AuthController {
  accessTokens: string[] = [];
  refreshTokens: string[] = [];
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: UserDTO): Promise<LoginResponse> {
    let user = await this.authService.FindUserByUserName(loginData.username);
    if (!user) {
      return { success: false, message: 'User does not exist' };
    }
    if (user.password !== loginData.password) {
      return { success: false, message: 'Password is incorrect' };
    }
    let accessToken = await this.authService.generateJWT(user);
    let refreshToken = await this.authService.generateRefresh(user);
    this.accessTokens.push(accessToken);
    this.refreshTokens.push(refreshToken);
    return {
      success: true,
      id: user.id,
      message: 'Login successful',
      token: accessToken,
      refresh: refreshToken,
    };
  }

  @Post('create-user')
  async register(@Body() registrationData: UserDTO) {
    if (
      registrationData.username == null &&
      registrationData.password == null
    ) {
      return { message: 'Username and password are required' };
    }
    let existedUser = await this.authService.FindUserByUserName(
      registrationData.username,
    );
    if (existedUser) {
      return { message: 'User already exists' };
    }
    let newUser = await this.authService.register(registrationData);
    return {
      message: 'User created successfully',
      user: newUser,
    };
  }

  @Post('verify')
  async verify(@Body() token) {
    try {
      return await this.authService.verifyJWT(token.token);
    } catch (error) {
      return { message: 'Invalid token or expired' };
    }
  }
}

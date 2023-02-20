import { Injectable } from '@nestjs/common';
import { UserDTO } from '../database/DTOs/user.dto';
import { User } from '../database/entities';
import { generateJWT } from './helpers/jwt.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async register(registrationData: UserDTO) {
    return await User.create(registrationData as any);
  }

  async FindUserByUserName(username: string) {
    return await User.findOne({ where: { username } });
  }

  async FindUserById(id: string) {
    return await User.findOne({ where: { id } });
  }

  async FindUserByRole(role: string) {
    return await User.findOne({ where: { role } });
  }

  async generateJWT(user: UserDTO) {
    return await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '2s' },
    );
  }
  async generateRefresh(user: UserDTO) {
    return await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '20s' },
    );
  }
  async verifyJWT(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}

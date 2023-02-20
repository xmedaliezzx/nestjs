import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/modules/database/DTOs/user.dto';
export const generateJWT = async (user: UserDTO, jwtService: JwtService) => {
 return jwtService.signAsync({ id: user.id }, { expiresIn: '2s' });
};

export const generateRefresh = async (user: UserDTO, jwtService: JwtService) => {
    return jwtService.signAsync({ id: user.id }, { expiresIn: '10s' });
   };
   
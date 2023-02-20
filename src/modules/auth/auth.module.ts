import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret'
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

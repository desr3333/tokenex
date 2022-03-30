import { Global, Module } from '@nestjs/common';

import { TelegramAccountModule } from '@modules/telegram-account';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [TelegramAccountModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

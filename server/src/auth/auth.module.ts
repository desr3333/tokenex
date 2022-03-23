import { Global, Module } from '@nestjs/common';

import { TelegramAccountModule } from './../modules/telegram-account/telegram-account.module';

import { AuthController, TelegramAuthController } from './auth.controller';
import { AuthService, TelegramAuthService } from './auth.service';

@Global()
@Module({
  imports: [TelegramAccountModule],
  controllers: [AuthController, TelegramAuthController],
  providers: [AuthService, TelegramAuthService],
  exports: [AuthService, TelegramAuthService],
})
export class AuthModule {}

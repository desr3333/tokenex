import { ApiProperty } from '@nestjs/swagger';

export class QueryTelegramAccountDto {
  @ApiProperty()
  where: {
    chatId?: number;
  };
}

export class CreateTelegramAccountDto {
  @ApiProperty({ default: Date.now() })
  chatId: number;

  @ApiProperty({ default: `TelegramAccount#${Date.now()}` })
  username?: string;

  @ApiProperty({ default: null })
  firstName?: string;

  @ApiProperty({ default: new Date() })
  createdAt?: Date;

  @ApiProperty({ default: new Date() })
  updatedAt?: Date;
}

export class UpdateTelegramAccountDto {
  @ApiProperty()
  chatId: number;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty({ default: new Date() })
  updatedAt?: Date;
}

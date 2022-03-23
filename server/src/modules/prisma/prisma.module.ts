import { Global, Module } from '@nestjs/common';

import { PrismaService } from '@modules/prisma';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

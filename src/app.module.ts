import { PrismaModule } from 'nestjs-prisma';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}

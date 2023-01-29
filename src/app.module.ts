import { PrismaModule } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadEncryptionConfig } from 'configs/encryption.config';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [loadEncryptionConfig] }),
    PrismaModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

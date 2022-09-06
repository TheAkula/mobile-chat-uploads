import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [UploadsModule, ConfigModule.forRoot()],
})
export class AppModule {}

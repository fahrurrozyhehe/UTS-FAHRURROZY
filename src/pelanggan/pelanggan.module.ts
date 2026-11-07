import { Module } from '@nestjs/common';
import { PelangganService } from './pelanggan.service.js';
import { PelangganController } from './pelanggan.controller.js';

@Module({
  controllers: [PelangganController],
  providers: [PelangganService],
})
export class PelangganModule {}
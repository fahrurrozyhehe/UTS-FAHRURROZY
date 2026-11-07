import { Module } from '@nestjs/common';
import { KendaraanService } from './kendaraan.service.js';
import { KendaraanController } from './kendaraan.controller.js';

@Module({
  controllers: [KendaraanController],
  providers: [KendaraanService],
})
export class KendaraanModule {}
import { Module } from '@nestjs/common';
import { PenyewaanService } from './penyewaan.service.js';
import { PenyewaanController } from './penyewaan.controller.js';
import { PenyewaanResolver } from './penyewaan.resolver.js';

@Module({
  controllers: [PenyewaanController],
  providers: [PenyewaanService, PenyewaanResolver],
})
export class PenyewaanModule {}

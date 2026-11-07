import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PenyewaanService } from './penyewaan.service.js';
import { CreatePenyewaanDto } from './dto/create-penyewaan.dto.js';
import { UpdatePenyewaanDto } from './dto/update-penyewaan.dto.js';

@Controller('penyewaan')
export class PenyewaanController {
  constructor(private readonly penyewaanService: PenyewaanService) {}

  @Post()
  async create(@Body() dto: CreatePenyewaanDto) {
    return {
      message: 'Penyewaan berhasil ditambahkan',
      data: await this.penyewaanService.create(dto),
    };
  }

  @Get()
  async findAll() {
    return {
      message: 'Daftar penyewaan berhasil diambil',
      data: await this.penyewaanService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Detail penyewaan berhasil diambil',
      data: await this.penyewaanService.findOne(id),
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePenyewaanDto) {
    return {
      message: 'Penyewaan berhasil diperbarui',
      data: await this.penyewaanService.update(id, dto),
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Penyewaan berhasil dihapus',
      data: await this.penyewaanService.remove(id),
    };
  }
}
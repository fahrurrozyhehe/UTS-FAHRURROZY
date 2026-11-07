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
import { KendaraanService } from './kendaraan.service.js';
import { CreateKendaraanDto } from './dto/create-kendaraan.dto.js';
import { UpdateKendaraanDto } from './dto/update-kendaraan.dto.js';

@Controller('kendaraan')
export class KendaraanController {
  constructor(private readonly kendaraanService: KendaraanService) {}

  @Post()
  async create(@Body() dto: CreateKendaraanDto) {
    return {
      message: 'Kendaraan berhasil ditambahkan',
      data: await this.kendaraanService.create(dto),
    };
  }

  @Get()
  async findAll() {
    return {
      message: 'Daftar kendaraan berhasil diambil',
      data: await this.kendaraanService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Detail kendaraan berhasil diambil',
      data: await this.kendaraanService.findOne(id),
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateKendaraanDto) {
    return {
      message: 'Kendaraan berhasil diperbarui',
      data: await this.kendaraanService.update(id, dto),
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Kendaraan berhasil dihapus',
      data: await this.kendaraanService.remove(id),
    };
  }
}
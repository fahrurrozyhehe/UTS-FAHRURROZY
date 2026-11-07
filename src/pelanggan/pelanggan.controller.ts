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
import { PelangganService } from './pelanggan.service.js';
import { CreatePelangganDto } from './dto/create-pelanggan.dto.js';
import { UpdatePelangganDto } from './dto/update-pelanggan.dto.js';

@Controller('pelanggan')
export class PelangganController {
  constructor(private readonly pelangganService: PelangganService) {}

  @Post()
  async create(@Body() dto: CreatePelangganDto) {
    return {
      message: 'Pelanggan berhasil ditambahkan',
      data: await this.pelangganService.create(dto),
    };
  }

  @Get()
  async findAll() {
    return {
      message: 'Daftar pelanggan berhasil diambil',
      data: await this.pelangganService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Detail pelanggan berhasil diambil',
      data: await this.pelangganService.findOne(id),
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePelangganDto) {
    return {
      message: 'Pelanggan berhasil diperbarui',
      data: await this.pelangganService.update(id, dto),
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Pelanggan berhasil dihapus',
      data: await this.pelangganService.remove(id),
    };
  }
}
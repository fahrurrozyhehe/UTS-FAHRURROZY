import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePelangganDto } from './dto/create-pelanggan.dto.js';
import { UpdatePelangganDto } from './dto/update-pelanggan.dto.js';

@Injectable()
export class PelangganService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePelangganDto) {
    return this.prisma.pelanggan.create({ data: dto });
  }

  findAll() {
    return this.prisma.pelanggan.findMany({ include: { penyewaan: true } });
  }

  findOne(id: number) {
    return this.prisma.pelanggan.findUnique({ where: { id }, include: { penyewaan: true } });
  }

  update(id: number, dto: UpdatePelangganDto) {
    return this.prisma.pelanggan.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.pelanggan.delete({ where: { id } });
  }
}
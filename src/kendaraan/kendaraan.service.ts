import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateKendaraanDto } from './dto/create-kendaraan.dto.js';
import { UpdateKendaraanDto } from './dto/update-kendaraan.dto.js';

@Injectable()
export class KendaraanService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateKendaraanDto) {
    return this.prisma.kendaraan.create({ data: dto });
  }

  findAll() {
    return this.prisma.kendaraan.findMany({ include: { penyewaan: true } });
  }

  findOne(id: number) {
    return this.prisma.kendaraan.findUnique({ where: { id }, include: { penyewaan: true } });
  }

  update(id: number, dto: UpdateKendaraanDto) {
    return this.prisma.kendaraan.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.kendaraan.delete({ where: { id } });
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePenyewaanDto } from './dto/create-penyewaan.dto.js';
import { UpdatePenyewaanDto } from './dto/update-penyewaan.dto.js';

@Injectable()
export class PenyewaanService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePenyewaanDto) {
    return this.prisma.penyewaan.create({
      data: {
        tanggal_sewa: new Date(dto.tanggal_sewa),
        total_biaya: dto.total_biaya,
        pelangganId: dto.pelangganId,
        kendaraanId: dto.kendaraanId,
      },
      include: { pelanggan: true, kendaraan: true },
    });
  }

  findAll() {
    return this.prisma.penyewaan.findMany({
      include: { pelanggan: true, kendaraan: true },
    });
  }

  findOne(id: number) {
    return this.prisma.penyewaan.findUnique({
      where: { id },
      include: { pelanggan: true, kendaraan: true },
    });
  }

  update(id: number, dto: UpdatePenyewaanDto) {
    return this.prisma.penyewaan.update({
      where: { id },
      data: {
        ...(dto.tanggal_sewa !== undefined && {
          tanggal_sewa: new Date(dto.tanggal_sewa),
        }),
        ...(dto.total_biaya !== undefined && { total_biaya: dto.total_biaya }),
        ...(dto.pelangganId !== undefined && { pelangganId: dto.pelangganId }),
        ...(dto.kendaraanId !== undefined && { kendaraanId: dto.kendaraanId }),
      },
      include: { pelanggan: true, kendaraan: true },
    });
  }

  remove(id: number) {
    return this.prisma.penyewaan.delete({ where: { id } });
  }
}
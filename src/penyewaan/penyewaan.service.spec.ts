import { PrismaService } from '../prisma/prisma.service.js';
import { PenyewaanService } from './penyewaan.service.js';

describe('PenyewaanService', () => {
  it('updates total_biaya to zero', async () => {
    const update = vi.fn().mockResolvedValue({});
    const prisma = {
      penyewaan: { update },
    } as unknown as PrismaService;
    const service = new PenyewaanService(prisma);

    await service.update(1, { total_biaya: 0 });

    expect(update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { total_biaya: 0 },
      include: { pelanggan: true, kendaraan: true },
    });
  });
});
